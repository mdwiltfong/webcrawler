interface QueueI {
  items: Object;
  headIndex: number;
  enqueue: Function;
  dequeue: Function;
  peek: Function;
  size: Function;
  isEmpty: Function;
  clear: Function;
}

type Item = URL;
export default class Queue implements QueueI {
  items: Item[];
  headIndex: number;

  constructor() {
    this.items = [];
    this.headIndex = 0;
  }

  //adds a new element
  enqueue(element: URL): boolean {
    this.items.push(element);
    return true;
  }

  //removes an element from head of the queue
  dequeue(): Item | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.shift();
  }

  //shows the head element of the  queue
  peek() {
    let peekElement = this.items[0];
    return peekElement;
  }

  //shows the number of items in queue
  size() {
    return this.items.length;
  }

  //checks if queue is empty or not
  isEmpty(): boolean {
    return this.size() === 0;
  }

  //empty the queue
  clear() {
    this.items = [];
    this.headIndex = 0;
  }
}
