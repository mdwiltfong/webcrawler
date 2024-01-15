import { Pages } from "./crawl";
export function printReport(pages: Pages) {
  console.log("=======Web Crawler Report================");
  for (const page in pages) {
    console.log(`Found ${pages[page]} internal links to ${page}\n`);
  }
}
