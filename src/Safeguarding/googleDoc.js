// Renders a Google Doc as our own HTML instead of an iframe embed.
//
// The Google Docs "publish to web" iframe drags in Google's own layout, fonts
// and scrollbars, which looks wrong inside the site. Instead we fetch the doc's
// HTML export on the server, throw away every Google class and inline style,
// and keep only the structure (headings, lists, tables, links, images). The
// page then styles that structure itself, so the doc stays live-editable while
// the page still looks like a KiwiHacks document.
//
// The doc must be shared as "anyone with the link can view" for the export
// endpoint to answer without a login.

// A doc with tabs exports only its first tab unless a tab is named. The tab
// parameter is undocumented (the Drive API has no per-tab export at all), so it
// is used on a best-effort basis: a tab that fails to fetch is skipped rather
// than taking the page down with it.
const EXPORT_URL = (docId, tabId) =>
  `https://docs.google.com/document/d/${docId}/export?format=html` +
  (tabId ? `&tab=${encodeURIComponent(tabId)}` : "");

// Elements we keep, mapped to what we emit. Everything else is either unwrapped
// (contents kept, tag dropped) or dropped whole, per the two sets below.
const KEEP = new Set([
  "h1", "h2", "h3", "h4", "h5", "h6",
  "p", "blockquote", "hr", "br",
  "ul", "ol", "li",
  "table", "thead", "tbody", "tfoot", "tr", "td", "th",
  "a", "img",
  "strong", "b", "em", "i", "u", "sub", "sup",
  "code", "pre",
]);

// Dropped along with everything inside them.
const DROP_WITH_CONTENT = new Set(["script", "style", "head", "title", "meta", "link", "noscript"]);

const VOID_TAGS = new Set(["br", "hr", "img"]);

// The page supplies its own <h1> (from the document's title paragraph), so the
// document's headings shift down one level to keep a single page title. A doc
// that uses Heading 1 as its title instead of the title style therefore renders
// that title as its first section.
const DEMOTE = { h1: "h2", h2: "h3", h3: "h4", h4: "h5", h5: "h6", h6: "h6" };

// Google expresses bold/italic/underline as classes in a <style> block, not as
// <strong>/<em>. Read that block so those spans survive as real semantic tags.
function parseStyleClasses(html) {
  const classes = new Map();
  const styleBlocks = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
  for (const block of styleBlocks) {
    const css = block.replace(/<\/?style[^>]*>/gi, "");
    const ruleRe = /\.([a-zA-Z0-9_-]+)\s*\{([^}]*)\}/g;
    let rule;
    while ((rule = ruleRe.exec(css)) !== null) {
      const [, name, body] = rule;
      const existing = classes.get(name) || {};
      if (/font-weight:\s*(bold|[6-9]00)/i.test(body)) existing.bold = true;
      if (/font-style:\s*italic/i.test(body)) existing.italic = true;
      if (/text-decoration:[^;]*underline/i.test(body)) existing.underline = true;
      classes.set(name, existing);
    }
  }
  return classes;
}

function attr(attrs, name) {
  const match = attrs.match(
    new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s"'>]+))`, "i"),
  );
  if (!match) return null;
  return match[2] ?? match[3] ?? match[4] ?? null;
}

function escapeAttribute(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Google rewrites every external link as https://www.google.com/url?q=<target>.
function cleanHref(rawHref) {
  if (!rawHref) return null;
  let href = rawHref.replace(/&amp;/g, "&");
  const redirect = href.match(/^https?:\/\/(www\.)?google\.com\/url\?(?:.*&)?q=([^&]+)/i);
  if (redirect) {
    try {
      href = decodeURIComponent(redirect[2]);
    } catch {
      href = redirect[2];
    }
  }
  if (/^(https?:|mailto:|tel:)/i.test(href)) return href;
  // "//host" is scheme-relative, not a path: it leaves the site. Anyone who can
  // edit the document could otherwise smuggle an outbound link past this check.
  if (href.startsWith("//")) return null;
  if (href.startsWith("#") || href.startsWith("/")) return href;
  return null;
}

// Google numbers its outline through classes like lst-kix_abc-2, where the
// suffix is the nesting depth. The depth is the only thing that says whether an
// item is a section title, a subheading, or a bullet, so it has to survive.
function listDepth(attrs) {
  const match = (attr(attrs, "class") || "").match(/lst-kix_[a-z0-9]+-(\d+)/i);
  return match ? Number(match[1]) : 0;
}

function cleanId(rawId) {
  return rawId && /^[\w.:-]+$/.test(rawId) ? rawId : null;
}

// A small stack-based rewriter. Regex alone can't do this: a </span> has to know
// whether its opening tag became <strong>, <em>, both, or nothing at all.
function rewriteBody(bodyHtml, styleClasses) {
  const tokenRe = /<!--[\s\S]*?-->|<\/?([a-zA-Z0-9]+)((?:"[^"]*"|'[^']*'|[^>])*)>|[^<]+/g;
  const out = [];
  const stack = [];
  const listDepths = [];
  let dropDepth = 0;
  let dropTag = null;
  let token;

  while ((token = tokenRe.exec(bodyHtml)) !== null) {
    const raw = token[0];
    const tag = token[1] ? token[1].toLowerCase() : null;
    const attrs = token[2] || "";

    if (raw.startsWith("<!--")) continue;

    if (dropDepth > 0) {
      if (tag === dropTag) dropDepth += raw.startsWith("</") ? -1 : 1;
      if (dropDepth === 0) dropTag = null;
      continue;
    }

    if (!tag) {
      out.push(raw);
      continue;
    }

    const isClosing = raw.startsWith("</");
    const selfClosing = raw.endsWith("/>");

    if (!isClosing && DROP_WITH_CONTENT.has(tag)) {
      if (!selfClosing && !VOID_TAGS.has(tag)) {
        dropDepth = 1;
        dropTag = tag;
      }
      continue;
    }
    if (isClosing && DROP_WITH_CONTENT.has(tag)) continue;

    if (isClosing) {
      // Find the most recent unclosed entry for this tag; anything opened after
      // it was never closed, so close those too rather than leaking tags.
      if (tag === "ol" || tag === "ul") listDepths.pop();
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i].source !== tag) continue;
        for (let j = stack.length - 1; j >= i; j--) {
          out.push(stack[j].close);
        }
        stack.length = i;
        break;
      }
      continue;
    }

    if (tag === "span" || tag === "font") {
      // Bold/italic live in the class, so turn the class back into real tags.
      const classNames = (attr(attrs, "class") || "").split(/\s+/).filter(Boolean);
      let open = "";
      let close = "";
      const style = classNames.reduce(
        (acc, name) => Object.assign(acc, styleClasses.get(name) || {}),
        {},
      );
      if (style.bold) { open += "<strong>"; close = "</strong>" + close; }
      if (style.italic) { open += "<em>"; close = "</em>" + close; }
      if (!selfClosing) stack.push({ source: tag, close });
      out.push(open);
      continue;
    }

    if (!KEEP.has(tag)) {
      // div, body, html, section... keep the contents, drop the wrapper.
      if (!selfClosing && !VOID_TAGS.has(tag)) stack.push({ source: tag, close: "" });
      continue;
    }

    let emitted = DEMOTE[tag] || tag;
    let openTag = `<${emitted}`;

    if (tag === "ol" || tag === "ul") {
      listDepths.push(listDepth(attrs));
      openTag += ` data-depth="${listDepths[listDepths.length - 1]}"`;
    } else if (tag === "li") {
      openTag += ` data-depth="${listDepths[listDepths.length - 1] ?? 0}"`;
    } else if (tag === "p" && /\btitle\b/.test(attr(attrs, "class") || "")) {
      // Google's title paragraph style is how the document names itself.
      openTag += " data-title";
    }

    if (tag === "a") {
      const href = cleanHref(attr(attrs, "href"));
      const id = cleanId(attr(attrs, "id"));
      if (id) openTag += ` id="${escapeAttribute(id)}"`;
      if (href) {
        openTag += ` href="${escapeAttribute(href)}"`;
        if (/^https?:/i.test(href) && !href.includes("kiwihacks.org")) {
          openTag += ' target="_blank" rel="noopener noreferrer"';
        }
      }
    } else if (tag === "img") {
      const src = attr(attrs, "src");
      // Relative sources only exist inside the zip export, so they'd 404 here.
      if (!src || !/^https?:\/\//i.test(src)) continue;
      const alt = attr(attrs, "alt") || "";
      openTag += ` src="${escapeAttribute(src)}" alt="${escapeAttribute(alt)}" loading="lazy"`;
    } else {
      const id = cleanId(attr(attrs, "id"));
      if (id) openTag += ` id="${escapeAttribute(id)}"`;
    }

    if (VOID_TAGS.has(tag)) {
      out.push(`${openTag} />`);
      continue;
    }

    openTag += ">";
    out.push(openTag);
    if (!selfClosing) stack.push({ source: tag, close: `</${emitted}>` });
    if ((tag === "ol" || tag === "ul") && selfClosing) listDepths.pop();
  }

  // Close anything the document left open.
  for (let i = stack.length - 1; i >= 0; i--) out.push(stack[i].close);

  return out
    .join("")
    // Google emits an empty paragraph between most blocks; they'd double the
    // spacing the stylesheet already sets.
    .replace(/<p>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>/g, "")
    .replace(/<(strong|em)>\s*<\/\1>/g, "")
    .trim();
}

// Google's numbered-outline documents put everything in lists: depth 0 holds the
// section headings, depth 1 the subheadings, and depth 2+ the actual bullets.
// Rendered literally that is a wall of nested numbers, so the outline is turned
// back into headings and plain bullet lists.
function restructureOutline(html) {
  let out = html;

  // Depth 0: a one-item list wrapping a heading is just that heading.
  out = out.replace(
    /<(ol|ul) data-depth="0">\s*<li data-depth="0">\s*(<h[2-6][^>]*>[\s\S]*?<\/h[2-6]>)\s*<\/li>\s*<\/\1>/g,
    "$2",
  );

  // Depth 1: a one-item list acting as a subheading.
  out = out.replace(
    /<(ol|ul) data-depth="1">\s*<li data-depth="1">([\s\S]*?)<\/li>\s*<\/\1>/g,
    (match, tag, inner) =>
      /<(p|ul|ol|table|h[2-6])\b/.test(inner) ? match : `<h3>${inner.trim()}</h3>`,
  );

  // Anything left is a real bullet list. Google starts a fresh list for every
  // run of items, so neighbours at the same depth are merged back together.
  let merged;
  do {
    merged = out;
    out = out.replace(
      /<(ol|ul) data-depth="(\d+)">((?:(?!<(?:ol|ul)\b)[\s\S])*?)<\/\1>\s*<\1 data-depth="\2">((?:(?!<(?:ol|ul)\b)[\s\S])*?)<\/\1>/g,
      '<$1 data-depth="$2">$3$4</$1>',
    );
  } while (out !== merged);

  return out;
}

// The table of contents exports as a run of links with the printed page number
// stuck on the end, which means nothing on a web page. Only the part before the
// first section is searched, so a cross-reference inside the body ("see section
// 4") is left where the document put it.
function extractContents(html) {
  const firstSection = html.search(/<h2\b/);
  if (firstSection > 0) {
    const head = extractContents(html.slice(0, firstSection));
    return { body: head.body + html.slice(firstSection), entries: head.entries };
  }

  const entryRe =
    /<p[^>]*>\s*(?:<(?:strong|em)>\s*)*<a href="(#[^"]+)"[^>]*>([\s\S]*?)<\/a>\s*(?:<\/(?:strong|em)>\s*)*<\/p>/g;
  const entries = [];
  const body = html.replace(entryRe, (match, href, text) => {
    const label = text
      .replace(/(?:&nbsp;|\s)+\d+\s*$/, "")
      .replace(/\s+/g, " ")
      .trim();
    if (!label) return match;
    entries.push({ href, label });
    return "";
  });

  return { body, entries };
}

// The document's own title paragraphs: the first names the page, the rest read
// as the standfirst above the sections.
function extractTitles(html) {
  const titles = [];
  const body = html.replace(
    /<p data-title[^>]*>([\s\S]*?)<\/p>/g,
    (match, inner) => {
      const text = inner
        .replace(/<[^>]+>/g, "")
        .replace(/\\+\s*$/, "")
        .trim();
      if (text) titles.push(text);
      return "";
    },
  );

  return { body, titles };
}

export function sanitizeGoogleDocHtml(html) {
  const styleClasses = parseStyleClasses(html);
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const body = bodyMatch ? bodyMatch[1] : html;
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);

  const rewritten = restructureOutline(rewriteBody(body, styleClasses));
  const withoutTitles = extractTitles(rewritten);
  const withoutContents = extractContents(withoutTitles.body);

  return {
    // A tab export carries no <title>, so the document's own title paragraph is
    // the more reliable name of the two.
    title: withoutTitles.titles[0] ?? (titleMatch ? titleMatch[1].trim() : null),
    subtitles: withoutTitles.titles.slice(1),
    contents: withoutContents.entries,
    html: withoutContents.body.trim(),
  };
}

async function fetchTab(docId, tabId) {
  const response = await fetch(EXPORT_URL(docId, tabId), {
    redirect: "follow",
    headers: { "user-agent": "kiwihacks.org (+https://kiwihacks.org)" },
  });

  if (!response.ok) throw new Error(`Google responded ${response.status}`);

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) {
    // A zip means the doc has embedded images the export can't inline.
    throw new Error(`Unexpected content type: ${contentType}`);
  }

  const raw = await response.text();
  // An unshared doc answers with the Google account chooser, not the doc.
  if (/<title>\s*(Sign in|Meet Google Drive)/i.test(raw)) {
    throw new Error("Document is not shared publicly");
  }

  return sanitizeGoogleDocHtml(raw);
}

// Per-instance cache. Vercel keeps a warm function around between requests, so
// this stops a burst of traffic turning into a burst of requests to Google, and
// keeps the last good copy to serve if Google is briefly unreachable.
const cache = new Map();
const FRESH_MS = 5 * 60 * 1000;

// tabIds: the tabs to stitch together, in order, for a doc that uses tabs. Each
// id is the t.xxxx value in the doc URL when that tab is open. Leave it empty
// for a single-tab doc.
export async function loadGoogleDoc(docId, { ttlMs = FRESH_MS, tabIds = [] } = {}) {
  if (!docId) {
    return {
      ok: false,
      error: "missing-doc-id",
      html: null,
      title: null,
      subtitles: [],
      contents: [],
      fetchedAt: null,
    };
  }

  const key = `${docId}::${tabIds.join(",")}`;
  const cached = cache.get(key);
  const now = Date.now();
  if (cached?.ok && now - cached.fetchedAt < ttlMs) return cached;

  try {
    if (tabIds.length > 0) {
      const tabs = await Promise.all(
        tabIds.map((tabId) =>
          fetchTab(docId, tabId).catch((error) => ({ html: "", title: null, error })),
        ),
      );

      const html = tabs.map((tab) => tab.html).filter(Boolean).join("\n");
      if (!html) throw new Error("No tab could be fetched");

      const result = {
        ok: true,
        html,
        title: tabs.find((tab) => tab.title)?.title ?? null,
        subtitles: tabs.flatMap((tab) => tab.subtitles ?? []),
        contents: tabs.flatMap((tab) => tab.contents ?? []),
        fetchedAt: now,
        error: null,
        missingTabs: tabs.filter((tab) => tab.error).length,
      };
      cache.set(key, result);
      return result;
    }

    const { html, title, subtitles, contents } = await fetchTab(docId, null);
    if (!html) throw new Error("Document exported empty");

    const result = { ok: true, html, title, subtitles, contents, fetchedAt: now, error: null };
    cache.set(key, result);
    return result;
  } catch (error) {
    // Stale content beats an error page, so a warm cache still serves the doc.
    if (cached?.ok) return { ...cached, stale: true, error: String(error.message || error) };
    return {
      ok: false,
      error: String(error.message || error),
      html: null,
      title: null,
      subtitles: [],
      contents: [],
      fetchedAt: null,
    };
  }
}

// The page lays the document out the way /code-of-conduct is laid out: one
// dashed box per top-level section. The export is a flat run of blocks, so cut
// it at every top-level heading and hand back the pieces.
export function splitIntoSections(html) {
  if (!html) return { lead: "", sections: [] };

  const parts = html.split(/(?=<h2(?:\s[^>]*)?>)/);
  const lead = parts[0].startsWith("<h2") ? "" : parts.shift().trim();

  return {
    lead,
    sections: parts.map((part) => part.trim()).filter(Boolean),
  };
}
