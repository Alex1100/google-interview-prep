class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  addNode(node) {
    if (this.head === null) {
      this.head = new Node(node);
      this.head.prev = null;
      this.tail = this.head;
      return true;
    }

    let current = this.head;

    while(current.next !== null) {
      current = current.next;
    }

    current.next = new Node(node);
    current.next.prev = current;
    this.tail = current.next;
  }

  contains(data) {
    if (this.head.data === data) {
      return true;
    }

    let current = this.head;

    while(current.next !== null) {
      current = current.next;
      if (current.data === data) {
        return true;
      }
    }

    return false;
  }

  getByData(data) {
    if (this.head.data === data) {
      return this.head;
    }

    let current = this.head;

    while(current.next !== null) {
      if (current.data === data) {
        return current;
      }
      current = current.next;
    }

    return false;
  }

  getByIndex(index) {
    let current = this.head;
    let count = 0;
    while(current.next !== null) {
      if (count === index) {
        return current;
      }
      count++;
      current = current.next;
    }
    return false;
  }

  removeNode(node) {
    let removed;
    if (this.head.data === node) {
      removed = this.head;
      this.head = removed.next;
      this.head.prev = null;
      return removed;
    }

    let current = this.head;

    while(current !== null) {
      if (current.data === node) {
        removed = current
        current = removed.next;
        current.prev = removed.prev;
        current.prev.next = current;
        return removed;
      } else {
        current = current.next;
      }
    }

    return false;
  }

  appendToHead(node) {
    let currentHead = this.head;
    let nextToHead = this.head.next;
    let newNode = new Node(node);
    this.head.next = newNode;
    this.head.next.next = nextToHead;
    this.head.next.next.prev = this.head.next;
  }

  prependToTail(node) {
    let currentTail = this.tail;
    let beforeTail = this.tail.prev;
    let newNode = new Node(node);
    this.tail.prev = newNode;
    this.tail.prev.prev = beforeTail;
    this.tail.prev.prev.next = newNode;
    this.tail.prev.next = this.tail;
  }

  removeHead() {
    let removed = this.head;
    this.head = removed.next;
    this.head.prev = null;
    this.head.next = removed.next.next;
    this.head.next.prev = removed.next.next.prev;
    return removed;
  }

  removeTail() {
    let removed = this.tail;
    this.tail = removed.prev;
    this.tail.next = null;
    return removed;
  }

  listToArray() {
    let temp = [this.head.data];
    let current = this.head.next;

    while(current !== null) {
      temp.push(current.data);
      current = current.next;
    }

    return temp;
  }
}


let ll = new LinkedList();

ll.addNode(10);
ll.addNode(12);
ll.addNode(100);
ll.addNode(33);
ll.addNode(23);
console.log("LinkedList is: ", ll.head.next.prev);
console.log(ll.contains(100));
console.log(ll.contains(1000));
console.log(ll.getByIndex(2));
console.log(ll.getByData(12));
console.log(ll.getByData(10000));
console.log(ll.getByIndex(1000));
console.log(ll.removeNode(12));
console.log("\n\n", ll);
console.log(ll.appendToHead(2000));
console.log(ll.prependToTail(999));
console.log("\n\n", ll.listToArray());
console.log(ll.removeHead());
console.log(ll.removeTail());
console.log("\n\n", ll.listToArray())

