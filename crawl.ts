/*
normalizeURL takes in a single URL (type string) and returns normalized version of the URL as a string. 
To be specific, it should: 
- Verify that the provided strings match a certain pattern
- If the string matches the pattern, it will return `blog.boot.dev/path
- The pattern is based on these URLs: 
    - https://blog.boot.dev/path/
    - https://blog.boot.dev/path
    - http://blog.boot.dev/path/
    - http://blog.boot.dev/path
*/

import { JSDOM } from "jsdom";
import Queue from "./Queue";
export function normalizeURL(params: string) {
  const url = new URL(params);
  const constructedURL = `${url.host}${url.pathname}`;
  if (constructedURL.slice(-1) === "/") {
    return constructedURL.slice(0, -1);
  }
  return constructedURL;
}
/*
Takes in two arguments:
1. A string of the HTML Body
2. A string of the base URL
*/
export function getURLsFromHTML(htmlBody: string, baseURL: string) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const anchors = dom.window.document.querySelectorAll("a");

  for (const anchor of anchors) {
    if (anchor.hasAttribute("href")) {
      let href = anchor.getAttribute("href")!;

      try {
        href = new URL(href, baseURL).href;
        urls.push(href);
      } catch (err: any) {
        console.log(`${err.message}: ${href}`);
      }
    }
  }

  return urls;
}

/*
- In the first call of crawlPage(), currentURL will be the baseURL.
- As we make additional fetch requests to all the URLs we find on on baseURL, the currentURL will cahnge while the base stays the same.
- The `pages` object will be used to keep track of the number of times we've seen an internal link. 
- crawlPage will always return an updated `pages` object. 

Overall Steps:
1. Make sure the currentURL and the baseURL are in the same domain. If not, return the pages object. We only want to crawl the site we seed. Not the entire internet. 
2. Get a normalized version of currentURL.
3. If the pages object already has an entry for the currentURL, increment the count.
4. Otherwise, add an entry to the pages object. 
*/

type Pages = {
  [site: string]: number;
};
export async function crawlPage(
  baseURL: string,
  currentURL: string,
  pages: Pages,
  queue: Queue
): Promise<Pages | undefined> {
  try {
    const curURL = new URL(currentURL);
    const basURL = new URL(baseURL);
    if (curURL.hostname !== basURL.hostname) {
      return pages;
    }
    const normalizedURL = normalizeURL(currentURL);
    if (pages[normalizedURL] > 0) {
      pages[normalizedURL]++;
      return pages;
    }
    pages[normalizedURL] = 1;
    console.log("Crawling - > ", currentURL);
    const response = await fetch(currentURL);
    if (response.status !== 200) {
      console.log(`Got HTTP Error for ${currentURL}: ${response.status}`);
      return pages;
    }
    const contentType = response.headers.get("content-type")!;
    if (!contentType.includes("text/html")) {
      console.log(`Got text/html response: ${contentType}`);
      return pages;
    }
    const htmlBody = await response.text();
    const urls = getURLsFromHTML(htmlBody, baseURL);
    const promises = urls.map((url) => crawlPage(baseURL, url, pages, queue));
    for (const promise of promises) {
      await promise;
    }
    return pages;
  } catch (error: any) {
    console.error(error.message);
  }
}
