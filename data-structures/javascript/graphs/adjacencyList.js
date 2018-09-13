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
    this.size--;
    return this.items.pop();
  }

  contains(item) {
    return this.items.includes(item);
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



class Graph {
  constructor() {
    this.adjacencyList = {};
    this.nodesList = [];
  }


  addVertex(vertex) {
    this.nodesList.push(vertex);
    this.adjacencyList[vertex] = new LinkedList;
  }

  sameVertexes(fromVertex, toVertex) {
    return fromVertex === toVertex
  }

  hasEdge(fromVertex, toVertex) {
    return this.adjacencyList[fromVertex].contains(toVertex) === true;
  }

  hasEdges(fromVertex, toVertex) {
    return this.hasEdge(fromVertex, toVertex) && this.hasEdge(toVertex, fromVertex);
  }

  addEdge(fromVertex, toVertex) {
    let args = [fromVertex, toVertex]

    if (this.sameVertexes(...args) || this.hasEdges(...args)) {
      return;
    }

    this.adjacencyList[fromVertex].addNode(toVertex);
  }

  addEdges(fromVertex, toVertex) {
    let args = [fromVertex, toVertex]

    if (this.sameVertexes(...args) || this.hasEdges(...args)) {
      return;
    }

    this.adjacencyList[fromVertex].addNode(toVertex);
    this.adjacencyList[toVertex].addNode(fromVertex);
  }

  removeVertex(vertex) {
    if (!this.nodesList.includes(vertex)) {
      return;
    }

    let removed = this.adjacencyList[vertex];
    delete this.adjacencyList[vertex];
    this.nodesList = this.nodesList.filter(el => el !== vertex)
    this.removeEdge(vertex);

    return removed;
  }

  removeEdge(vertex) {
    for (let vertexIndex = 0; vertexIndex < this.nodesList.length; vertexIndex++) {
      if (this.adjacencyList[this.nodesList[vertexIndex]]) {
        if (this.adjacencyList[this.nodesList[vertexIndex]].contains(vertex)) {
          this.adjacencyList[this.nodesList[vertexIndex]].removeNode(vertex);
        }
      }
    }
  }

  removeEdges(fromVertex, toVertex) {
    if (!this.hasEdges(fromVertex, toVertex)) {
      return;
    }

    this.adjacencyList[fromVertex].removeNode(toVertex);
    this.adjacencyList[toVertex].removeNode(fromVertex);
  }

  DFSUtil(source_node, visited, stack){
    if (stack.size === this.nodesList.length) {
      return;
    }

    if (!visited[source_node]) {
      stack.insert(source_node);
      visited[source_node] = true;
    }

    this.adjacencyList[source_node]
    .listToArray()
    .forEach((node, index) => {
      if(!visited[node]){
        this.DFSUtil(node, visited, stack);
      }
    });
  }

  depthFirstSearch(source_node) {
    let visited = {},
        stack   = new Stack();

    this.DFSUtil(source_node, visited, stack);
    return stack.items;
  }


  BFSUtil(source_node, visited, queue, result_queue) {
    if (result_queue.size === this.nodesList.length) {
      return;
    }

    if (!visited[source_node]) {
      visited[source_node] = true;
      result_queue.enqueue(source_node);
    }

    if (queue.contains(source_node)) {
      queue.dequeue();
    }

    this.adjacencyList[source_node]
    .listToArray()
    .forEach((node, index) => {
      if (!visited[node]) {
        visited[node] = true;
        queue.enqueue(node);
        result_queue.enqueue(node);
      }
    });

    queue.items.forEach(node => {
      this.BFSUtil(node, visited, queue, result_queue);
    });
  }

  breadthFirstSearch(source_node) {
    let visited      = {},
        queue        = new Queue(),
        result_queue = new Queue();

    this.BFSUtil(source_node, visited, queue, result_queue);
    return result_queue.items;
  }

  hasCycleUtil(source_node, visited, visited_stack) {
    if (this.adjacencyList[source_node].head === null) {
      return;
    }

    if (!visited[source_node]) {
      visited_stack.insert(source_node);
      visited[source_node] = true;

      let arr = this.adjacencyList[source_node]
      .listToArray()

      for (let node = 0; node < arr.length; node++) {
        if (!visited[arr[node]] && this.hasCycleUtil(arr[node], visited, visited_stack)) {
          return true;
        } else if (visited_stack.contains(arr[node])) {
          return true;
        }
      }
    }

    visited_stack.pop();
    return false;
  }

  hasCycle() {
    let source_node = this.nodesList[0];
    let visited = {};
    let visited_stack = new Stack();

    return this.hasCycleUtil(source_node, visited, visited_stack);
  }


  findCycleUtil(source_node, visited, visited_stack) {
    if (this.adjacencyList[source_node].head === null) {
      return;
    }

    if (!visited[source_node]) {
      visited_stack.insert(source_node);
      visited[source_node] = true;

      let arr = this.adjacencyList[source_node]
      .listToArray();

      for (let node = 0; node < arr.length; node++) {
        if (!visited[arr[node]] && this.findCycleUtil(arr[node], visited, visited_stack)) {
          return arr[node];
        } else if (visited_stack.contains(arr[node])) {
          return arr[node];
        }
      }
    }

    visited_stack.pop();
    return null;
  }

  findCycle() {
    let source_node = this.nodesList[0];
    let visited = {};
    let visited_stack = new Stack();

    return this.findCycleUtil(source_node, visited, visited_stack);
  }
}


let adjList = new Graph();

adjList.addVertex('A');
adjList.addVertex('B');
adjList.addVertex('C');
adjList.addVertex('D');
adjList.addVertex('E');
adjList.addVertex('F');
adjList.addVertex('G');
adjList.addVertex('H');
console.log("ADJ LIST IS: ", adjList.adjacencyList);
adjList.addEdges('A', 'B');
adjList.addEdges('A', 'C');
adjList.addEdges('A', 'D');
adjList.addEdges('C', 'G');
adjList.addEdges('G', 'H');
adjList.addEdges('D', 'H');
adjList.addEdges('H', 'F');
adjList.addEdges('B', 'E');
adjList.addEdges('E', 'H');
adjList.addEdges('F', 'B');
console.log("\nADJ LIST IS: ", adjList);
console.log("\n\nSHOULD BE: [ 'E', 'B', 'C', 'D', 'A', 'F', 'G', 'H' ]");
console.log("\n\nDFS IS: ", adjList.depthFirstSearch('E'));
console.log("\n\nBFS IS: ", adjList.breadthFirstSearch('E'));
adjList.removeVertex('A');
console.log("\nADJ LIST IS: ", adjList.adjacencyList);
console.log("\n\nDFS IS: ", adjList.depthFirstSearch('E'));
console.log("\n\nBFS IS: ", adjList.breadthFirstSearch('E'));
adjList.removeEdge('C', 'G');
console.log("\n\nADJ LIST IS: ", adjList);
console.log(adjList.hasEdge('H', 'E'))
console.log(`should be [ 'E', 'F', 'G', 'H', 'B', 'D' ]`);
console.log("\n\nDFS IS: ", adjList.depthFirstSearch('E'));
console.log("\n\nBFS IS: ", adjList.breadthFirstSearch('E'));
console.log("\n\nGRAPH CONTAINS CYCLE: ", adjList.hasCycle());
console.log("\n\nGRAPH CYCLES AT: ", adjList.findCycle());


let newGraph = new Graph();

newGraph.addVertex(10);
newGraph.addVertex(12);
newGraph.addVertex(14);
newGraph.addVertex(16);
newGraph.addVertex(100);

newGraph.addEdge(10, 100);
newGraph.addEdge(10, 12);
newGraph.addEdge(12, 14);

console.log("\n\nGRAPH CONTAINS CYCLE: ", newGraph.hasCycle());
console.log("\n\nGRAPH CYCLES AT: ", newGraph.findCycle());

newGraph.addEdge(100, 16);
newGraph.addEdge(100, 12);
newGraph.addEdge(14, 100);

console.log("\n\nGRAPH CONTAINS CYCLE: ", newGraph.hasCycle());
console.log("\n\nGRAPH CYCLES AT: ", newGraph.findCycle());

