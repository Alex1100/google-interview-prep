class Stack {
  constructor() {
    this.items = [];
    this.size = 0;
  }

  insert(item) {
    this.items.push(item);
    this.size++;
  }

  pop() {
    const popped = this.items.pop()
    this.size--;
    return popped;
  }

  peek() {
    this.items[this.size - 1];
  }

  getMin() {
    return Math.min(...this.items);
  }

  getMax() {
    return Math.max(...this.items)
  }

  isEmpty() {
    return this.size === 0;
  }
}


// Queue from two Stacks

class QueueFromStacks {
  constructor() {
    this.entryStack = new Stack();
    this.queue = new Stack();
    this.size = 0;
  }

  enqueue(item) {
    this.entryStack.insert(item)

    while(this.entryStack.size > 0) {
      let popped = this.entryStack.pop();
      this.queue.insert(popped);
      this.size++;
    }
  }

  dequeue() {
    if (this.entryStack.isEmpty()) {
      while(!this.queue.isEmpty()) {
        this.entryStack.insert(this.queue.pop())
      }
    }
    return this.entryStack.pop();
  }

  front() {
    return this.queue.peek();
  }

  viewQueue() {
    if (this.entryStack.isEmpty()) {
      return this.queue;
    } else {
      return this.entryStack;
    }
  }

  isEmpty() {
    return this.size === 0;
  }
}


let b = new QueueFromStacks();
b.enqueue(10);
b.enqueue(30);
b.enqueue(150);
console.log("OUR QUEUE IS: ", b.viewQueue())
b.dequeue()
console.log("NOW OUR QUEUE IS: ", b.viewQueue())
b.enqueue(55);
console.log("FINALLY OUR QUEUE IS: ", b.viewQueue())
