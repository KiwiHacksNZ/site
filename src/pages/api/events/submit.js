import { createHash, randomUUID } from "node:crypto";
import { submissionsClient } from "../../../sanity/client";
import { nzLocalToDate } from "../../../Events/events";
import { CITIES, EVENT_TYPES, FORMATS } from "../../../Events/options";

export const prerender = false;

const HOURLY_LIMIT = 5;
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const SHORT = 200;
const AGREEMENTS = ["confirmAges", "confirmAdult", "confirmReview"];

// Slack reads `text`, Discord reads `content`. Sending both covers either webhook.
async function notifyTeam({ title, organiser, name, email }) {
  const url = import.meta.env.SUBMISSION_NOTIFY_URL;
  if (!url) return;
  const text = `New event submission: ${title} by ${organiser}. Reply to ${name} <${email}>.`;
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) return;
    const res = await fetch(parsed, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text, content: text }),
    });
    if (!res.ok) console.error("Submission notify failed", res.status);
  } catch (error) {
    console.error("Submission notify failed", error);
  }
}

const fail = (message, status = 400) => Response.json({ error: message }, { status });

const isUrl = (value) => {
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
};

export async function POST({ request, clientAddress }) {
  if (!submissionsClient) return fail("Submissions aren't set up on this server.", 503);

  const form = await request.formData();
  if (form.get("website_confirm")) return Response.json({ ok: true });

  const text = (name) => String(form.get(name) ?? "").trim();
  const f = Object.fromEntries(
    ["title", "eventType", "format", "city", "startsAt", "endsAt", "venue", "audience", "cost", "signupUrl",
      "websiteUrl", "summary", "about", "organiser", "name", "email"].map((name) => [name, text(name)]),
  );

  const missing = ["title", "eventType", "format", "city", "startsAt", "endsAt", "audience", "cost", "summary",
    "about", "organiser", "name", "email"].filter((name) => !f[name]);
  if (missing.length) return fail(`Missing: ${missing.join(", ")}`);
  if (!EVENT_TYPES.includes(f.eventType) || !FORMATS.includes(f.format) || !CITIES.includes(f.city)) {
    return fail("Choose a type, format and place from the lists.");
  }
  if (AGREEMENTS.some((name) => form.get(name) !== "yes")) return fail("Confirm the safety statements.");
  if (f.format !== "Online" && !f.venue) return fail("Add a venue address, or set the format to Online.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) return fail("Check your email address.");
  if (!f.signupUrl && !f.websiteUrl) return fail("Add a sign-up link or a website.");
  if ([f.signupUrl, f.websiteUrl].some((url) => url && !isUrl(url))) return fail("Links need to start with https://");
  const tooLong = ["title", "venue", "audience", "cost", "signupUrl", "websiteUrl", "organiser", "name", "email"]
    .some((name) => f[name].length > SHORT);
  if (tooLong || f.summary.length > 140 || f.about.length > 3000) return fail("Some text is too long.");

  const startsAt = nzLocalToDate(f.startsAt);
  const endsAt = nzLocalToDate(f.endsAt);
  if (Number.isNaN(+startsAt) || Number.isNaN(+endsAt) || endsAt < startsAt) return fail("Check the start and end times.");
  if (endsAt < new Date()) return fail("That event has already finished.");

  const header = form.get("headerImage");
  const logo = form.get("logo");
  const photos = form.getAll("photos").filter((file) => file?.size).slice(0, 6);
  if (!header?.size) return fail("Add a header image.");
  const files = [header, ...(logo?.size ? [logo] : []), ...photos];
  if (files.some((file) => !IMAGE_TYPES.includes(file.type))) return fail("Images need to be JPG, PNG or WebP.");

  // Hashed so Sanity never holds raw IP addresses.
  const ipHash = createHash("sha256").update(clientAddress ?? "unknown").digest("hex");
  const recent = await submissionsClient.fetch(
    `count(*[_type == "submission" && ipHash == $ipHash && _createdAt > $since])`,
    { ipHash, since: new Date(Date.now() - 3600_000).toISOString() },
  );
  if (recent >= HOURLY_LIMIT) return fail("Too many submissions from here. Try again in an hour.", 429);

  const uploaded = [];
  const upload = async (file) => {
    if (!file?.size) return undefined;
    const asset = await submissionsClient.assets.upload("image", Buffer.from(await file.arrayBuffer()), {
      filename: file.name,
      contentType: file.type,
    });
    uploaded.push(asset._id);
    return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  };

  try {
    // allSettled, so cleanup below only runs once every upload has finished.
    const results = await Promise.allSettled([header, logo, ...photos].map(upload));
    const failed = results.find((result) => result.status === "rejected");
    if (failed) throw failed.reason;
    const [headerImage, logoImage, ...photoImages] = results.map((result) => result.value);
    await submissionsClient.create({
      // Sanity only serves IDs containing a dot to authenticated requests. That
      // dot is all that keeps the submitter's details out of the public API.
      _id: `submission.${randomUUID()}`,
      _type: "submission",
      title: f.title,
      eventType: f.eventType,
      format: f.format,
      city: f.city,
      startsAt: startsAt.toISOString(),
      endsAt: endsAt.toISOString(),
      venue: f.venue || undefined,
      audience: f.audience,
      cost: f.cost,
      signupUrl: f.signupUrl || undefined,
      websiteUrl: f.websiteUrl || undefined,
      summary: f.summary,
      about: f.about,
      headerImage: { ...headerImage, alt: f.title },
      photos: photoImages.map((image) => ({ ...image, _key: randomUUID().slice(0, 8) })),
      organiser: f.organiser,
      logo: logoImage,
      name: f.name,
      email: f.email,
      confirmAges: true,
      confirmAdult: true,
      confirmReview: true,
      agreedAt: new Date().toISOString(),
      ipHash,
    });
  } catch (error) {
    await Promise.allSettled(uploaded.map((id) => submissionsClient.delete(id)));
    console.error("Event submission failed", error);
    return fail("Something went wrong saving that. Try again, or email us.", 500);
  }

  await notifyTeam(f);
  return Response.json({ ok: true });
}
