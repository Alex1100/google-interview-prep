class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  addNode(node) {
    if (this.size === 0) {
      let newNode = new Node(node);
      this.head = newNode;
      this.tail = newNode;
      this.size++;
    } else {
      let currentNode = this.head;

      while(currentNode.next !== null) {
        currentNode = currentNode.next;
      }

      currentNode.next = new Node(node);
      this.tail = currentNode.next;
      this.size++;
    }
  }

  contains(data) {
    if (this.head === null) {
      return false;
    }

    if (this.head.data === data || this.tail.data === data) {
      return true;
    } else {
      let currentNode = this.head;

      while(currentNode.next !== null) {
        currentNode = currentNode.next;
        if (currentNode.data === data) {
          return true;
        }
      }
    }

    return false;
  }

  removeNode(data) {
    if (!this.contains(data)) {
      return null;
    }

    let nodeToRemove;

    if (this.head.data === data) {
      nodeToRemove = this.head;
      this.head = this.head.next;
      this.size--;
      return nodeToRemove;
    } else {
      let currentNode = this.head;

      while(currentNode.next.next !== null && currentNode.next.data !== data) {
        currentNode = currentNode.next;
      }

      nodeToRemove = currentNode.next;
      if (this.tail.data === data) {
        this.tail = currentNode;
      }
      currentNode.next = nodeToRemove.next;
      this.size--;
      return nodeToRemove;
    }
  }

  removeHead() {
    if (this.size) {
      let originalHead = this.head;
      this.head = this.head.next;
      this.size--;
      return originalHead;
    }
  }

  removeTail() {
    let originalTail = this.tail;
    let currentNode = this.head;
    if (originalTail === currentNode) {
      this.head.next = null;
      this.head = null;
      this.tail = null;
      this.size--;
      return originalTail;
    }
    while(currentNode.next.data !== this.tail.data) {
      currentNode = currentNode.next;
    }

    currentNode.next = null;
    this.size--;
    this.tail = currentNode;
    return originalTail;
  }

  appendToHead(node) {
    let temp = this.head.next;
    let newNode = new Node(node);
    this.head.next = newNode;
    this.head.next.next = temp;
    this.size++;
  }

  prependToTail(node) {
    let temp = new Node(node);
    let originalTail = this.tail;
    let currentNode = this.head;

    while(currentNode.next.data !== this.tail.data) {
      currentNode = currentNode.next;
    }

    currentNode.next = temp;
    currentNode.next.next = this.tail;
    this.size++;
  }

  cloneLinkedList() {
    let newLinkedList = new LinkedList();
    let currentNode = this.head;

    newLinkedList.addNode(currentNode.data);

    while(currentNode.next !== null) {
      currentNode = currentNode.next;
      newLinkedList.addNode(currentNode.data);
    }

    return newLinkedList;
  }

  mergeLinkedLists(lists) {
    let sortedListNodes = {};
    let sortedLinkedList = new LinkedList();

    lists.forEach(list => {
      while(list.head !== null) {
        let removedFromBack;
        let removedFromFront;

        if (list.tail) {
          removedFromBack = list.removeTail().data;
          sortedListNodes[removedFromBack] === undefined ? sortedListNodes[removedFromBack] = 1 : sortedListNodes[removedFromBack]++;
        }
        if (list.head) {
          removedFromFront = list.removeHead().data;
          sortedListNodes[removedFromFront] === undefined ? sortedListNodes[removedFromFront] = 1 : sortedListNodes[removedFromFront]++;
        }
      }
    });

    for (let node in sortedListNodes) {
      let counter = sortedListNodes[node];
      while(counter > 0) {
        sortedLinkedList.addNode(node);
        counter--;
      }
    }

    return sortedLinkedList;
  }

  listToArray() {
    let result = [this.head.data];

    let current = this.head;

    while(current.next !== null) {
      current = current.next;
      result.push(current.data);
    }

    return result;
  }
}

// need to add resizing of storage
// aka open addressing

// already added closed-addressing
// aka seperational chaining
class HashTable {
  constructor(initialSize) {
    this.storage = [];

    for (let i = 0; i < initialSize; i++) {
      this.storage.push(new LinkedList);
    }

    this.storageLimit = initialSize;
    this.size = 0;

    const constant = 11021992;

    this.x = key => {
      let hash = 0;
      if (typeof key === 'string') {
        for (let i = 0; i < key.length; i++) {
          hash = (hash << 5) + hash + key.charCodeAt(i);
          hash = hash & hash;
          hash = Math.abs(hash << constant);
        }
      } else {
        hash = key << 5;
        hash = hash & hash;
        hash = Math.abs(hash >> constant);
      }

      return hash % this.storageLimit;
    }
  }

  insert(key, val) {
    let bucketIndex = this.hash(key);
    if (this.storage[bucketIndex].head === null) {
      this.storage[bucketIndex].addNode([key, val])
      return true;
    }

    let current = this.storage[bucketIndex].head;
    let complete = false;

    while(current !== null && complete === false) {
      if (current.data[0] === key) {
        current.data[1] = val;
        complete = true;
        return true;
      }
      current = current.next;
    }

    this.storage[bucketIndex].addNode([key, val]);
    return true;
  }


  remove(key) {
    const bucketIndex = this.hash(key);
    if (bucketIndex > this.storageLimit) {
      return false;
    }
    let target;

    const currentBucket = this.storage[bucketIndex];
    let current = currentBucket.head;

    while(current !== null) {
      if (current.data[0] === key) {
        target = current.data;
        current = null;
      } else {
        current = current.next
      }
    }

    if (target) {
      const removed = currentBucket.removeNode(target);
      return removed;
    } else {
      return false;
    }
  }

  get(key) {
    const bucketIndex = this.hash(key);

    if (bucketIndex > this.storageLimit) {
      return false;
    }

    const currentBucket = this.storage[bucketIndex];
    let current = currentBucket.head;
    while(current !== null) {
      if (current.data[0] === key) {
        return current.data;
      }
      current = current.next;
    }

    return false;
  }

  contains(key) {
    return !a.get(key) === false
  }

  hash(key) {
    return this.x(key)
  }
}


let a = new HashTable(10);

console.log(a.hash(78))
a.insert("Doug", "Manager");
console.log(a.get("Doug"));
a.insert("Alex", "Software Engineer");
console.log(a.get("Alex"));
a.insert("Will", "UX/UI Designer");
console.log(a.get("Will"));
a.insert("Steve", "Designer");
console.log(a.get("Steve"));
a.insert("Frank", "Doctor");
console.log(a.get("Frank"));
a.insert("Alex", "Mechanic")
console.log(a.get("Alex"));
console.log(a.get("Q"));
console.log(a.contains("Q"));
console.log(a.contains("Alex"));
console.log(a.remove("Alex"));

