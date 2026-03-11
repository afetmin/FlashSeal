import { DEFAULT_ROBOTS, HOME_URL, OG_IMAGE_ALT, OG_IMAGE_URL, SECRET_ROBOTS } from "./core";

type MetaCopy = {
  pageTitle: string;
  pageDescription: string;
  lang?: string;
};

export function syncMeta(t: MetaCopy): void {
  const robots = window.location.pathname.match(/^\/s\/([^/]+)$/) ? SECRET_ROBOTS : DEFAULT_ROBOTS;
  document.documentElement.lang = t.lang || document.documentElement.lang;
  document.title = t.pageTitle;
  setMeta("name", "description", t.pageDescription);
  setMeta("name", "robots", robots);
  setMeta("name", "application-name", "FlashSeal");
  setMeta("name", "author", "FlashSeal");
  setMeta("property", "og:title", t.pageTitle);
  setMeta("property", "og:description", t.pageDescription);
  setMeta("property", "og:url", HOME_URL);
  setMeta("property", "og:image", OG_IMAGE_URL);
  setMeta("property", "og:image:alt", OG_IMAGE_ALT);
  setMeta("property", "og:image:width", "1502");
  setMeta("property", "og:image:height", "786");
  setMeta("property", "twitter:title", t.pageTitle);
  setMeta("property", "twitter:description", t.pageDescription);
  setMeta("name", "twitter:url", HOME_URL);
  setMeta("name", "twitter:image", OG_IMAGE_URL);
  setMeta("name", "twitter:image:alt", OG_IMAGE_ALT);
  setCanonical(HOME_URL);
}

function setMeta(attribute: string, value: string, content: string): void {
  const selector = `meta[${attribute}="${value}"]`;
  const element = document.querySelector<HTMLMetaElement>(selector) || createMeta(attribute, value);
  element.setAttribute("content", content);
}

function createMeta(attribute: string, value: string): HTMLMetaElement {
  const element = document.createElement("meta");
  element.setAttribute(attribute, value);
  document.head.append(element);
  return element;
}

function setCanonical(url: string): void {
  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.append(canonical);
  }
  canonical.setAttribute("href", url);
}
