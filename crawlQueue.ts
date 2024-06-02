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
    } else {
      if (currentURL !== baseURL) {
        pages[normalizedURL] = 1;
      } else {
        pages[normalizedURL] = 0;
      }
    }

    console.log("Crawling -> ", normalizedURL.toString());
    const response = await fetch(currentURL);
    if (response.status !== 200) {
      console.log(`Failed to crawl ${currentURL}`);
      continue;
    }
    const html = await response.text();
    const dom = new JSDOM(html);
    const aElements = dom.window.document.querySelectorAll("a");
    for (const aElement of aElements) {
      if (aElement.href.slice(0, 1) === "/") {
        try {
          queue.enqueue(new URL(aElement.href, currentURL));
        } catch (err: any) {
          console.log(`${err.message}: ${aElement.href}`);
        }
      } else {
        try {
          queue.enqueue(new URL(aElement.href));
        } catch (err: any) {
          console.log(`${err.message}: ${aElement.href}`);
        }
      }
    }
  }
  return pages;
}
