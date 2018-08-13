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

const a = new Stack();
a.insert(10);
a.insert(9);
a.insert(11);
a.insert(120);
console.log("A IS: ", a);
a.pop();
console.log("NOW A IS: ", a);
