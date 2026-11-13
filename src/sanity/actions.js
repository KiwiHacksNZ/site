import { useClient } from 'sanity';
import imageUrlBuilder from '@sanity/image-url';

export const PUBLIC_DATASET = import.meta.env.PUBLIC_SANITY_DATASET || 'production';

const slugify = (text) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60) || 'event';

// Everything a submission holds except the submitter's contact details and images.
const PUBLIC_FIELDS = ['title', 'eventType', 'format', 'city', 'startsAt', 'endsAt', 'venue', 'audience', 'cost',
  'signupUrl', 'websiteUrl', 'summary', 'about', 'organiser'];

const imageRefs = (doc) =>
  [doc.headerImage, doc.logo, ...(doc.photos ?? [])].filter(Boolean).map((image) => image.asset._ref);

async function deleteSubmission(client, doc) {
  const id = doc._id.replace(/^drafts\./, '');
  await client.transaction().delete(id).delete(`drafts.${id}`).commit();
  await Promise.all(imageRefs(doc).map((ref) => client.delete(ref).catch(() => {})));
}

export function ApproveAction({ id, draft, published, onComplete }) {
  const client = useClient({ apiVersion: '2026-08-02' });
  const doc = draft ?? published;

  return {
    label: 'Approve and list',
    tone: 'positive',
    disabled: !doc,
    onHandle: async () => {
      if (!window.confirm(`List "${doc.title}" on the events page?`)) return onComplete();
      const target = client.withConfig({ dataset: PUBLIC_DATASET });
      const builder = imageUrlBuilder(client);

      // Re-encoding through the image CDN drops EXIF data such as GPS.
      const copy = async (image, width) => {
        const blob = await (await fetch(builder.image(image).width(width).fit('max').format('jpg').url())).blob();
        const asset = await target.assets.upload('image', blob, { filename: `${id}.jpg` });
        return { _type: 'image', asset: { _type: 'reference', _ref: asset._id }, ...(image.alt && { alt: image.alt }) };
      };

      const { headerImage, logo, photos } = doc;
      const fields = Object.fromEntries(PUBLIC_FIELDS.filter((name) => doc[name] != null).map((name) => [name, doc[name]]));
      await target.create({
        ...fields,
        _id: id,
        _type: 'communityEvent',
        slug: { _type: 'slug', current: `${slugify(doc.title)}-${id.slice(0, 4)}` },
        headerImage: await copy(headerImage, 2400),
        ...(logo && { logo: await copy(logo, 400) }),
        photos: await Promise.all((photos ?? []).map(async (photo) => ({ ...(await copy(photo, 1600)), _key: photo._key }))),
      });
      await deleteSubmission(client, doc);
      onComplete();
    },
  };
}

export function RejectAction({ draft, published, onComplete }) {
  const client = useClient({ apiVersion: '2026-08-02' });
  const doc = draft ?? published;

  return {
    label: 'Reject and delete',
    tone: 'critical',
    disabled: !doc,
    onHandle: async () => {
      if (window.confirm(`Delete "${doc.title}", its photos and the submitter's details?`)) await deleteSubmission(client, doc);
      onComplete();
    },
  };
}
