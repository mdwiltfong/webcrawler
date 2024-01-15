import { argv } from "node:process";
import { getURLsFromHTML, normalizeURL, crawlPage } from "./crawl";
async function main() {
  try {
    if (argv.length < 3 || argv.length > 3) {
      console.error("Invalid number of arguments. Please provide a URL.");
      process.exit(1);
    }
    const BASE_URL = argv[2];
    console.log(`Starting with ${BASE_URL}`);
    await crawlPage(BASE_URL, BASE_URL, {});
  } catch (error: any) {
    console.error(error.message);
  }
}
main();
