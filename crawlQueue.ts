import { normalizeURL } from "./crawl";
import Queue from "./Queue";
import { Pages } from "./types/types";
import { JSDOM } from "jsdom";
export async function crawlQueue(baseURL: URL, pages: Pages, queue: Queue) {
  while (!queue.isEmpty()) {
    const currentURL = queue.dequeue();
    if (currentURL == undefined) {
      console.log("Queue is empty");
      return pages;
    }
    if (currentURL.hostname != baseURL.hostname) {
      continue;
    }
    const normalizedURL = normalizeURL(currentURL.toString());
    if (pages[normalizedURL] > 0) {
      pages[normalizedURL]++;
      continue;
    }

    pages[normalizedURL] = 1;

    console.log("Crawling -> ", normalizedURL);
    const response = await fetch(currentURL);
    if (response.status !== 200) {
      console.log(`Failed to crawl ${currentURL}`);
      continue;
    }
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("text/html")) {
      console.log(`Got non-HTML response: ${contentType}`);
      continue;
    }
    const html = await response.text();
    const dom = new JSDOM(html);
    const aElements = dom.window.document.querySelectorAll("a");
    for (const anchor of aElements) {
      if (anchor.hasAttribute("href")) {
        let href = anchor.getAttribute("href")!;
        // convert any relative URLs to absolute URLs
        href = new URL(href, baseURL).href;
        queue.enqueue(new URL(href));
      }
    }
  }
}
