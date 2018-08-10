class Graph {
  constructor() {
    this.vertexes = {};
    this.nodesArray = [];
  }

  addNode(node){
    if (!this.vertexes[node]) {
      this.vertexes[node] = {};
      this.nodesArray.push(node);
    }
  }

  contains(item){
    return this.vertexes[item] ? true : false;
  }

  removeNode(node){
    if (this.contains(node)) {
      let refsToRemove = this.vertexes[node];
      delete this.vertexes[node];
      refsToRemove.forEach(ref => {
        if(this.vertexes[ref].includes(node)){
          delete this.vertexes[ref]
        }
      });


      const idxToRemove =
        this.nodesArray.indexOf(node);

      this.nodesArray.splice(idxToRemove, 1);
    }
  }

  hasEdge(fromNode, toNode){
    return this.vertexes[fromNode].hasOwnProperty(toNode);
  }

  sameNodes(fromNode, toNode) {
    return fromNode === toNode
  }

  hasAllEdges(fromNode, toNode) {
    return this.hasEdge(fromNode, toNode) && this.hasEdge(toNode, fromNode);
  }

  addEdge(fromNode, toNode){
    let args = [fromNode, toNode]
    if (this.sameNodes(...args) || this.hasAllEdges(...args)) {
      return;
    }

    this.vertexes[fromNode][toNode] = null
    this.vertexes[toNode][fromNode] = null;
    this.addEdgeWeights(...args);
  }

  addEdgeWeights(fromNode, toNode) {
    let weight = Math.floor(Math.random() * Math.floor(10) + 1);
    this.vertexes[fromNode][toNode] = weight;
    this.vertexes[toNode][fromNode] = weight;
  }

  removeEdge(fromNode, toNode){
    delete this.vertexes[fromNode][toNode];
    delete this.vertexes[toNode][fromNode];
  }

  forEachNode(cb){
    this.nodesArray.forEach(node => cb(node));
  }

  DFSUtil(node, visited, visited_data){
    visited[node] = true;

    if(!visited_data.includes(node)){
      visited_data.push(node);
    }

    for(let i_node in this.vertexes) {
      if(visited[i_node] === false){
        this.DFSUtil(i_node, visited, visited_data);
      }
    }

    return visited_data;
  }

  BFSUtil(node, visited, visited_data, node_queue){
    visited[node] = true;

    if (visited_data.length  === this.nodesArray.length) {
      return visited_data
    }

    if (node_queue.includes(node)) {
      node_queue = node_queue.slice(1)
    }

    if (!visited_data.includes(node)) {
      visited_data.push(node)
    }

    for (let i_node in this.vertexes[node]) {
      node_queue.push(i_node)
    }

    node_queue.forEach((i_node, i) => {
      this.BFSUtil(i_node, visited, visited_data, node_queue)
    })

    return visited_data
  }

  DFS(node){
    let visited =
      Array.from(this.nodesArray, x => x = false);
    let visited_data = [];

    return this.DFSUtil(node.toString(), visited, visited_data);
  }

  BFS(node){
    let visited =
      Array.from(this.nodesArray, x => x = false);
    let visited_data = [];
    let node_queue = []

    return this.BFSUtil(node.toString(), visited, visited_data, node_queue)
  }

  length(u, v) {
    return (this.vertexes[u][v]);
  }

  extractMin(djSet, dist) {
    let minimumDistance = Infinity;
    let nodeWithMinimumDistance;

    djSet.forEach((k, v) => {
      if (dist[k] <= minimumDistance) {
        minimumDistance = dist[k];
        nodeWithMinimumDistance = k;
      }
    })

    return nodeWithMinimumDistance;
  }

  Dijkstra(source_node) {
    let djSet = new Set();
    let dist = {};
    let prev = {};

    for (let vertex in this.vertexes) {
      dist[vertex] = Infinity;
      prev[vertex] = undefined;
      djSet.add(vertex, this.vertexes[vertex]);
    }

    dist[source_node] = 0;

    while(djSet.size) {
      let u = this.extractMin(djSet, dist)

      for (let neighbor in this.vertexes[u]) {
        let alt = dist[u] + this.length(u, neighbor)

        if (alt < dist[neighbor]) {
          dist[neighbor] = alt;
          prev[neighbor] = u;
        }

      }

      djSet.delete(u);
    }

    console.log(dist);
    return dist;
  }
}



let zeNewGraph = new Graph();

let squareNodes = function(el){
  zeNewGraph.addNode(el * el);
};

g = new Graph();
g.addNode(0);
g.addNode(1);
g.addNode(2);
g.addNode(3);
g.addNode(5);
g.addNode(6);
g.addNode(100);
g.forEachNode(squareNodes)
console.log(zeNewGraph);
g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(1, 2);
g.addEdge(2, 0);
g.addEdge(2, 3);
g.addEdge(3, 3);
g.addEdge(0, 100)
g.addEdge(5, 1)
g.addEdge(6, 2)
g.addEdge(6, 5)
console.log("\n\n", g, "\n\n")
console.log(g.DFS(0));
// 0 -> 1 -> 2 -> 3 -> 6 -> 5
console.log(g.BFS(0));
// 0 -> 1 -> 2 -> 100 -> 5 -> 3 -> 6
console.log(g.DFS(1))
// 1 -> 0 -> 2 -> 3 -> 6 -> 5
console.log(g.BFS(1))
// 1 -> 0 -> 2 -> 5 -> 100 -> 3 -> 6
console.log(g.DFS(2))
// 2 -> 0 -> 1 -> 5 -> 3 -> 6
console.log(g.BFS(2))
// 2 -> 0 -> 1 -> 3 -> 6 -> 100 -> 5
console.log(g.DFS(3))
// 3 -> 2 -> 0 -> 1 -> 5 -> 6
console.log(g.BFS(3))
// 3 -> 2 -> 0 -> 1 -> 6 -> 100 -> 5
console.log(g.DFS(5))
// 5 -> 1 -> 0 -> 2 -> 3 -> 6
console.log(g.BFS(5))
// 5 -> 1 -> 0 -> 2 -> 100 -> 3 -> 6
console.log(g.DFS(6))
// 6 -> 2 -> 0 -> 1 -> 5 -> 3
console.log(g.BFS(6))
// 6 -> 2 -> 0 -> 1 -> 3 -> 100 -> 5
console.log(g.DFS(100))
// 100 -> 0 -> 1 -> 2 -> 3 -> 6 -> 5
console.log(g.BFS(100))
// 100 -> 0 -> 1 -> 2 -> 5 -> 3 -> 6
g.Dijkstra(1)
// { '0': 4, '1': 0, '2': 3, '3': 8, '5': 8, '6': 9, '100': 7 }
