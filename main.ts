import { argv } from "node:process";
import { crawlPage } from "./crawl";
import cluster from "cluster";
if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  cluster.fork();
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Forking a new worker");
    cluster.fork();
  });
} else {
  async function main() {
    try {
      if (argv.length < 3 || argv.length > 3) {
        console.error("Invalid number of arguments. Please provide a URL.");
        process.exit(1);
      }
      const BASE_URL = argv[2];
      console.log(`Starting with ${BASE_URL}`);
      const pages = await crawlPage(BASE_URL, BASE_URL, {});
      console.log(pages);
    } catch (error: any) {
      console.error(error.message);
    }
  }
  main();
}
