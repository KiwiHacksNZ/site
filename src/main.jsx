import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App/App.jsx";
import DateChangePage from "./DateChangePage/DateChangePage.jsx";
import NotFound from "./NotFound/NotFound.jsx";
import CodeOfConduct from "./CodeOfConduct/CodeOfConduct.jsx";
import ForkPreviewPage from "./ForkPreviewPage/ForkPreviewPage.jsx";
import ParentsGuide from "./ParentsGuide/ParentsGuide.jsx";
import AnnouncementVideoPage from "./Video/mobile/AnnouncementVideoPage.jsx";
import Showcase from "./Showcase/Showcase.jsx";
import AdminPage from "./Admin/AdminPage.jsx";
import AppConvexProvider from "./ConvexProvider.jsx";
import { seoHeadHtml } from "./SEO/seoConfig.js";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

const isSeoEnabled = String(import.meta.env.VITE_SEO || "false").trim().toLowerCase() === "true";

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function removeSeoElements() {
  const seoSelectors = [
    "title",
    'link[rel="canonical"]',
    'meta[name="description"]',
    'meta[name="robots"]',
    'meta[property^="og:"]',
    'meta[name^="twitter:"]',
    'meta[name="google-site-verification"]',
    'script[type="application/ld+json"][data-seo="managed"]',
  ];

  seoSelectors.forEach((selector) => {
    document.head.querySelectorAll(selector).forEach((element) => element.remove());
  });
}

function appendSeoHtml(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();

  const nodes = Array.from(template.content.childNodes);
  nodes.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      node.setAttribute("data-seo", "managed");
    }
    document.head.appendChild(node);
  });
}

function applySeoSettings(seoEnabled) {
  document.documentElement.lang = "en";
  removeSeoElements();

  if (!seoEnabled) {
    document.title = "KiwiHacks Fork Preview";
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: "noindex,nofollow,noarchive,nosnippet,max-image-preview:none",
    });
    return;
  }

  appendSeoHtml(seoHeadHtml);
}

applySeoSettings(isSeoEnabled);

const pathname = window.location.pathname.toLowerCase();
let PageComponent;
const renderNothing = () => null;

if (pathname === "/" || pathname === "") {
  PageComponent = App;
} else if (pathname === "/date-change") {
  //PageComponent = DateChangePage;
  PageComponent = NotFound;
} else if (pathname === "/announcement" || pathname === "/announcement-video") {
  //PageComponent = AnnouncementVideoPage;
  PageComponent = NotFound;
} else if (pathname === "/discord" || pathname === "/chat" || pathname === "/community" || pathname === "/dc") {
  window.location.replace("https://discord.gg/SNdNUQ4Vp7");
  PageComponent = renderNothing;
} else if (pathname === "/github" || pathname === "/code" || pathname === "/repo") {
  window.location.replace("https://github.com/N1k0s1/kiwihacks");
  PageComponent = renderNothing;
} else if (pathname === "/register" || pathname === "/countmein" || pathname === "/signup") {
  window.location.replace("https://kiwihacks.fillout.com/nova");
  PageComponent = renderNothing;
} else if (pathname === "/code-of-conduct" || pathname === "/coc" || pathname === "/codeofconduct" || pathname === "/conduct") {
  PageComponent = CodeOfConduct;
} else if (pathname === "/showcase" || pathname === "/projects") {
  PageComponent = Showcase;
} else if (pathname === "/admin" || pathname === "/showcase-admin") {
  PageComponent = AdminPage;
} else if (pathname === "/parents-guide" || pathname === "/parentsguide" || pathname === "/parents") {
  //PageComponent = ParentsGuide;
  window.location.replace("https://docs.google.com/document/d/14HMPfRkPQrFVf1E87cvsUqguILbtwoifEJ5hYUwhgRM/edit");
  PageComponent = renderNothing;
} else {
  PageComponent = NotFound;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppConvexProvider>
      <SpeedInsights /> {/*these get blocked by ad blockers, but they are still useful for development and for users who don't have ad blockers*/}
      <Analytics /> {/*these get blocked by ad blockers, but they are still useful for development and for users who don't have ad blockers*/}
      {isSeoEnabled ? <PageComponent /> : <ForkPreviewPage><PageComponent /></ForkPreviewPage>}
    </AppConvexProvider>
  </StrictMode>,
);
