import { argv } from "node:process";
import { crawlPage } from "./crawl";
import cluster from "cluster";
import Queue from "./Queue";
import { crawlQueue } from "./crawlQueue";
type Pages = {
  [site: string]: number;
};
const taskQueue = new Queue();
taskQueue.enqueue(new URL("https://blog.boot.dev"));
const pagesStore: Pages = {};
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  for (let i = 0; i < 2; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  (async () => {
    const delayTime = (cluster.worker!.id - 1) * 1000;
    await delay(delayTime);
    await main();
  })();
  async function main() {
    try {
      if (argv.length < 3 || argv.length > 3) {
        console.error("Invalid number of arguments. Please provide a URL.");
        process.exit(1);
      }
      const BASE_URL = new URL(argv[2]);
      console.log(`Starting with ${BASE_URL}`);
      console.log(
        `==========================================Worker ${process.pid} started`
      );
      const start = Date.now();
      const pages = await crawlQueue(BASE_URL, pagesStore, taskQueue);
      /*   const pages = await crawlPage(
        BASE_URL.toString(),
        BASE_URL.toString(),
        pagesStore,
        taskQueue
      ); */
      const stop = Date.now();
      console.log(pages);
      console.log("Time: ", stop - start);
    } catch (error: any) {
      console.error(error.message);
    }
  }

  //main();
}
