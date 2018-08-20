class Queue {
  constructor() {
    this.items = [];
    this.size = 0;
  }

  enqueue(item) {
    this.items.push(item);
    this.size++;
  }

  dequeue(item) {
    this.size--;
    return this.items.shift();
  }

  contains(node) {
    return this.items.includes(node);
  }

  front() {
    return this.items[0];
  }

  back() {
    return this.items[this.items.length - 1];
  }

  printQueue() {
    return this.items;
  }

  queueSize() {
    return this.size;
  }

  max() {
    return Math.max(...this.items);
  }

  min() {
    return Math.min(...this.items);
  }

  isEmpty() {
    return this.size === 0;
  }
}

class DoubleEndedQueue extends Queue {
  constructor() {
    super();
    this.hasOutputRestriction = () => null;
    this.hasInsertRestriction = () => null;
  }

  enqueue(item, direction = "back") {
    if (this.hasInsertRestriction()) {
      this.items.push(item);
      this.size++;
    } else {
      if (direction === "front") {
        this.items.unshift(item);
        this.size++;
      } else {
        this.items.push(item);
        this.size++;
      }
    }
  }

  dequeue(direction = "front") {
    if (this.hasOutputRestriction()) {
      this.size--;
      return this.items.shift();
    } else {
      if (direction === "back") {
        this.size--;
        return this.items.pop();
      } else {
        this.size--;
        return this.items.shift();
      }
    }
  }
}


class InputRestrictedDoubleEndedQueue extends DoubleEndedQueue {
  constructor() {
    super();
    this.hasInsertRestriction = () => true;
    this.hasOutputRestriction = () => false;
  }
}

class OutputRestrictedDoubleEndedQueue extends DoubleEndedQueue {
  constructor() {
    super();
    this.hasInsertRestriction = () => false;
    this.hasOutputRestriction = () => true;
  }
}

let a = new OutputRestrictedDoubleEndedQueue();
let b = new InputRestrictedDoubleEndedQueue();

a.enqueue(1);
a.enqueue(2);
a.enqueue(3, "front");
console.log("A IS: ", a)
a.dequeue();
a.dequeue();
console.log("A IS: ", a)
b.enqueue(11);
b.enqueue(12);
b.enqueue(13);
console.log("B IS: ", b)
b.dequeue('front');
b.dequeue('back');
console.log("B IS: ", b)
