import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { loadRenderers } from "astro:container";
import { getContainerRenderer } from "@astrojs/react/container-renderer";
import NotFoundPage from "../../src/pages/404.astro";

let containerPromise;

function getContainer() {
  containerPromise ??= (async () => {
    const renderers = await loadRenderers([getContainerRenderer()]);
    const container = await AstroContainer.create({ renderers });
    container.addClientRenderer({
      name: "@astrojs/react",
      entrypoint: "@astrojs/react/client.js",
    });
    // The container has no route table of its own, so register the site's
    // 404 page for pages that `Astro.rewrite("/404")`.
    container.insertPageRoute("/404", NotFoundPage);
    return container;
  })();
  return containerPromise;
}

// Renders an Astro page the way a request would, returning status and HTML.
export async function renderPage(Page, { path, params } = {}) {
  const container = await getContainer();
  const response = await container.renderToResponse(Page, {
    request: new Request(`https://kiwihacks.org${path}`),
    params,
  });
  return { status: response.status, html: await response.text() };
}
