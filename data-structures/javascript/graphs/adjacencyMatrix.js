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
  }

  addEdges(fromVertex, toVertex) {
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

  hasCycleUtil(source_node, visited, visited_stack) {
    if (!visited[source_node]) {
      visited_stack.insert(source_node);
      visited[source_node] = true;

      let currentEdges = this.adjacencyMatrix[this.vertexIndexList[source_node]];

      for (let node = 0; node < currentEdges.length; node++) {
        if (currentEdges[node] === 1) {
          if (!visited[this.nodesArray[node]] && this.hasCycleUtil(this.nodesArray[node], visited, visited_stack)) {
            return true;
          } else if (visited_stack.contains(this.nodesArray[node])) {
            return true;
          }
        }
      }
    }

    visited_stack.pop();
    return false;
  }

  hasCycle() {
    let source_node = this.nodesArray[0];
    let visited = {};
    let visited_stack = new Stack();

    return this.hasCycleUtil(source_node, visited, visited_stack);
  }

  findCycleUtil(source_node, visited, visited_stack) {
    if (!visited[source_node]) {
      visited_stack.insert(source_node);
      visited[source_node] = true;

      let currentEdges = this.adjacencyMatrix[this.vertexIndexList[source_node]];

      for (let node = 0; node < currentEdges.length; node++) {
        if (currentEdges[node] === 1) {
          if (!visited[this.nodesArray[node]] && this.findCycleUtil(this.nodesArray[node], visited, visited_stack)) {
            return this.nodesArray[node];
          } else if (visited_stack.contains(this.nodesArray[node])) {
            return this.nodesArray[node];
          }
        }
      }
    }

    visited_stack.pop();
    return null;
  }

  findCycle() {
    let source_node = this.nodesArray[0];
    let visited = {};
    let visited_stack = new Stack();

    return this.findCycleUtil(source_node, visited, visited_stack)
  }
}


let undirectedCyclicAdjacencyMatrix = new Graph();
undirectedCyclicAdjacencyMatrix.addVertex('A');
undirectedCyclicAdjacencyMatrix.addVertex('B');
undirectedCyclicAdjacencyMatrix.addVertex('C');
undirectedCyclicAdjacencyMatrix.addVertex('D');
undirectedCyclicAdjacencyMatrix.addVertex('E');
undirectedCyclicAdjacencyMatrix.addVertex('F');
undirectedCyclicAdjacencyMatrix.addVertex('G');
undirectedCyclicAdjacencyMatrix.addVertex('H');
console.log("ADJ MATRIX IS: ", undirectedCyclicAdjacencyMatrix.adjacencyMatrix);
undirectedCyclicAdjacencyMatrix.addEdges('A', 'B');
undirectedCyclicAdjacencyMatrix.addEdges('A', 'C');
undirectedCyclicAdjacencyMatrix.addEdges('A', 'D');
undirectedCyclicAdjacencyMatrix.addEdges('C', 'G');
undirectedCyclicAdjacencyMatrix.addEdges('G', 'H');
undirectedCyclicAdjacencyMatrix.addEdges('D', 'H');
undirectedCyclicAdjacencyMatrix.addEdges('H', 'F');
undirectedCyclicAdjacencyMatrix.addEdges('B', 'E');
undirectedCyclicAdjacencyMatrix.addEdges('E', 'H');
undirectedCyclicAdjacencyMatrix.addEdges('F', 'B');
console.log("\nADJ MATRIX IS: ", undirectedCyclicAdjacencyMatrix);
console.log("\n\nSHOULD BE: [ 'E', 'B', 'C', 'D', 'A', 'F', 'G', 'H' ]");
console.log("\n\nDFS IS: ", undirectedCyclicAdjacencyMatrix.depthFirstSearch('E'));
console.log("\n\nBFS IS: ", undirectedCyclicAdjacencyMatrix.breadthFirstSearch('E'));
undirectedCyclicAdjacencyMatrix.removeVertex('A');
console.log("\nADJ MATRIX IS: ", undirectedCyclicAdjacencyMatrix.adjacencyMatrix);
console.log("\n\nDFS IS: ", undirectedCyclicAdjacencyMatrix.depthFirstSearch('E'));
console.log("\n\nBFS IS: ", undirectedCyclicAdjacencyMatrix.breadthFirstSearch('E'));
undirectedCyclicAdjacencyMatrix.removeEdge('C', 'G');
console.log("\n\nADJ MATRIX IS: ", undirectedCyclicAdjacencyMatrix);
console.log(undirectedCyclicAdjacencyMatrix.hasEdge('H', 'E'))
console.log(`should be [ 'E', 'F', 'G', 'H', 'B', 'D' ]`);
console.log("\n\nDFS IS: ", undirectedCyclicAdjacencyMatrix.depthFirstSearch('E'));
console.log("\n\nBFS IS: ", undirectedCyclicAdjacencyMatrix.breadthFirstSearch('E'));
console.log("\n\nGRAPH CONTAINS CYCLE: ", undirectedCyclicAdjacencyMatrix.hasCycle());
console.log("\n\nGRAPH CYCLES AT: ", undirectedCyclicAdjacencyMatrix.findCycle());
