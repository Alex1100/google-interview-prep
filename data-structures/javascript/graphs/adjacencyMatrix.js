/*
 * Adjacency Matrices are only good
 * when our graph is dense, meaning if
 * the number of edges is close to
 * the number of vertexes^2, or
 * the number of vertexes^2 is too less
 * to matter
 *
 * In the real world, i.e (Social Network,
 * Web Crawlers, etc...), Adjacency
 * Matrices are inefficient. We are
 * better off using an Edge List,
 * or in other words, objects and
 * pointers, to represent our Graph
 *
 * Drawback could be that
 * we use an inefficient amount of
 * space with Adjacency Matrix
 * All the non edge indeces where
 * we have either Weight Infinity,
 * or a zero to signify it's not
 * a connected edge at the current
 * index, will take up more space
 * relative to the amount of actual
 * weighted/1-valued indeces in
 * our Ajacency Matrix
 */

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

class Graph {
  constructor() {
    this.vertexList = {};
    this.vertexIndexList = {};
    this.nodesArray = [];
    this.adjacencyMatrix = [];
  }

  addVertex(vertex) {
    this.vertexList[this.nodesArray.length] = vertex;
    this.vertexIndexList[vertex] = this.nodesArray.length;
    this.nodesArray.push(vertex);

    for (let i = 0; i < this.adjacencyMatrix.length; i++) {
      this.adjacencyMatrix[i] =
        this.nodesArray
          .map((element, j) => {
            return !this.adjacencyMatrix[i][j] ?
              element = 0 :
              element = 1
            });
    }

    this.adjacencyMatrix.push(this.nodesArray.map(el => el = 0));
  }

  addEdge(fromVertex, toVertex) {
    this.adjacencyMatrix[this.vertexIndexList[fromVertex]][this.vertexIndexList[toVertex]] = 1;
    this.adjacencyMatrix[this.vertexIndexList[toVertex]][this.vertexIndexList[fromVertex]] = 1;
  }

  removeVertex(vertex) {
    let count = 0;
    let targetIndex = this.vertexIndexList[vertex];

    delete this.vertexIndexList[vertex];
    delete this.vertexList[targetIndex];

    this.nodesArray.splice(targetIndex, 1);

    this.adjacencyMatrix =
      this.adjacencyMatrix
        .filter((vertexEdges, i) => {
          return i !== targetIndex
        });

    for (let vertexEdges = 0; vertexEdges < this.adjacencyMatrix.length; vertexEdges++) {
      this.adjacencyMatrix[vertexEdges].splice(targetIndex, 1)
    }

    for (let vertex in this.vertexList) {
      if (count < this.nodesArray.length) {
        let temp = this.vertexList[vertex];
        this.vertexList[Number(vertex) - 1] = temp;
        this.vertexIndexList[this.vertexList[Number(vertex) - 1]]--;
      }
      count++;
    }

    delete this.vertexList[count];
  }

  removeEdge(fromVertex, toVertex) {
    this.adjacencyMatrix[this.vertexIndexList[fromVertex]][this.vertexIndexList[toVertex]] = 0;
    this.adjacencyMatrix[this.vertexIndexList[toVertex]][this.vertexIndexList[fromVertex]] = 0;
  }

  hasEdge(fromVertex, toVertex) {
    return (
      this.adjacencyMatrix[this.vertexIndexList[fromVertex]][this.vertexIndexList[toVertex]] &&
      this.adjacencyMatrix[this.vertexIndexList[toVertex]][this.vertexIndexList[fromVertex]]
    ) ? true : false;
  }

  DFSUtil(source_node, visited, stack){
    if (stack.size === this.nodesArray.length) {
      return;
    }

    if (!visited[source_node]) {
      stack.insert(source_node);
      visited[source_node] = true;
    }

    this.adjacencyMatrix[this.vertexIndexList[source_node]]
    .forEach((node, index) => {
      if(!visited[this.vertexList[index]] && node === 1){
        this.DFSUtil(this.vertexList[index], visited, stack);
      }
    });
  }

  depthFirstSearch(source_node) {
    let visited = {},
        stack   = new Stack();

    this.DFSUtil(source_node, visited, stack);
    return stack.items;
  }

  BFSUtil(source_node, visited, node_queue, result) {
    if (result.size === this.nodesArray.length) {
      return;
    }

    if(!visited[source_node]) {
      result.enqueue(source_node);
      visited[source_node] = true;
    }

    if (node_queue.contains(source_node)) {
      node_queue.dequeue();
    }

    this.adjacencyMatrix[this.vertexIndexList[source_node]]
    .forEach((node, index) => {
      if (!visited[this.vertexList[index]] && node === 1) {
        visited[this.vertexList[index]] = true;
        node_queue.enqueue(this.vertexList[index]);
        result.enqueue(this.vertexList[index]);
      }
    });

    node_queue.items.forEach((node, node_index) => {
      this.BFSUtil(node, visited, node_queue, result);
    });
  }

  breadthFirstSearch(source_node) {
    let visited = {},
        queue   = new Queue(),
        result  = new Queue();

    this.BFSUtil(source_node, visited, queue, result);
    return result.items;
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
console.log("ADJ MATRIX IS: ", adjList.adjacencyMatrix);
adjList.addEdge('A', 'B');
adjList.addEdge('A', 'C');
adjList.addEdge('A', 'D');
adjList.addEdge('C', 'G');
adjList.addEdge('G', 'H');
adjList.addEdge('D', 'H');
adjList.addEdge('H', 'F');
adjList.addEdge('B', 'E');
adjList.addEdge('E', 'H');
adjList.addEdge('F', 'B');
console.log("\nADJ MATRIX IS: ", adjList.adjacencyMatrix);
console.log("\n\nDFS IS: ", adjList.depthFirstSearch('E'));
console.log("\n\nBFS IS: ", adjList.breadthFirstSearch('E'));
adjList.removeVertex('A');
console.log("\nADJ MATRIX IS: ", adjList.adjacencyMatrix);
console.log("\n\nDFS IS: ", adjList.depthFirstSearch('E'));
console.log("\n\nBFS IS: ", adjList.breadthFirstSearch('E'));
adjList.removeEdge('C', 'G');
console.log("\n\nADJ MATRIX IS: ", adjList);
console.log(adjList.hasEdge('H', 'E'))
console.log("\n\nDFS IS: ", adjList.depthFirstSearch('E'));
console.log("\n\nBFS IS: ", adjList.breadthFirstSearch('E'));
