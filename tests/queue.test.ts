import Queue from "../Queue";
const taskQueue = new Queue();

describe("Queue", () => {
  test("enqueue", () => {
    taskQueue.enqueue(new URL("https://blog.boot.dev"));
    expect(taskQueue.size()).toEqual(1);
  });

  test("dequeue", () => {
    taskQueue.dequeue();
    expect(taskQueue.size()).toEqual(0);
  });

  test("peek", () => {
    taskQueue.enqueue(new URL("https://blog.boot.dev"));
    expect(taskQueue.peek().toString()).toEqual("https://blog.boot.dev/");
  });

  test("size", () => {
    taskQueue.enqueue(new URL("https://blog.boot.dev"));
    expect(taskQueue.size()).toEqual(2);
  });

  test("isEmpty", () => {
    taskQueue.enqueue(new URL("https://blog.boot.dev"));
    expect(taskQueue.isEmpty()).toEqual(false);
  });

  test("clear", () => {
    taskQueue.clear();
    expect(taskQueue.size()).toEqual(0);
  });
});
