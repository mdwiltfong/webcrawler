interface QueueI {
  items: Object;
  headIndex: number;
  tailIndex: number;
  enqueue: Function;
  dequeue: Function;
  peek: Function;
  size: Function;
  isEmpty: Function;
  clear: Function;
}
type Link = {
  href: string;
  baseURL: string;
};
type Items = {
  [index: number]: Link;
};
export default class Queue implements QueueI {
  items: Items;
  headIndex: number;
  tailIndex: number;

  constructor() {
    this.items = {};
    this.headIndex = 0;
    this.tailIndex = 0;
  }

  //adds a new element
  enqueue(element: Link) {
    this.items[this.tailIndex] = element;
    this.tailIndex++;
  }

  //removes an element from head of the queue
  dequeue() {
    let removedElement = this.items[this.headIndex];
    delete this.items[this.headIndex];
    this.headIndex++;
    return removedElement;
  }

  //shows the head element of the  queue
  peek() {
    let peekElement = this.items[this.headIndex];
    return peekElement;
  }

  //shows the number of items in queue
  size() {
    return this.tailIndex - this.headIndex;
  }

  //checks if queue is empty or not
  isEmpty() {
    if (this.tailIndex - this.headIndex == 0) {
      return true;
    } else {
      return false;
    }
  }

  //empty the queue
  clear() {
    this.items = {};
    this.headIndex = 0;
    this.tailIndex = 0;
  }
}