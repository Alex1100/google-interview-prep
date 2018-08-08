class Graph {
  constructor() {
    this.data = {};
    this.nodesArray = [];
    this.edges = [];
    this.edgeWeights = {}
  }

  addNode(node){
    if (!this.data[node]) {
      this.data[node] = [];
      this.nodesArray.push(node);
    }
  }

  contains(item){
    return this.data[item] ? true : false;
  }

  removeNode(node){
    let refsToRemove = this.data[node];
    delete this.data[node];
    refsToRemove.forEach(ref => {
      if(this.data[ref].includes(node)){
        var item = this.data[ref].indexOf(node);
        this.data[ref].splice(item, 1);
      }
    });


    const idxToRemove =
      this.nodesArray.indexOf(node);

    this.nodesArray.splice(idxToRemove, 1);
  }

  hasEdge(fromNode, toNode){
    return this.data[fromNode].includes(toNode);
  }

  addEdge(fromNode, toNode){
    this.data[fromNode].push(toNode);
    this.data[toNode].push(fromNode);
  }

  addEdgeWeights(fromNode, toNode) {
    if (fromNode === toNode) {
      return
    }
    if (
      this.edgeWeights[fromNode] && this.edgeWeights[toNode] && this.edgeWeights[fromNode][toNode] && this.edgeWeights[toNode][fromNode]
    ) {
      return
    } else if (
      this.edgeWeights[fromNode] && this.edgeWeights[toNode]
    ){
      let weight = Math.floor(Math.random() * Math.floor(1000));
      this.edgeWeights[fromNode][toNode] = weight
      this.edgeWeights[toNode][fromNode] = weight
    } else {
      this.edgeWeights[fromNode] = {}
      this.edgeWeights[toNode] = {}
      let weight = Math.floor(Math.random() * Math.floor(1000));
      this.edgeWeights[fromNode][toNode] = weight
      this.edgeWeights[toNode][fromNode] = weight
    }
  }

  removeEdge(fromNode, toNode){
    let param1 =
      this.data[fromNode].indexOf(toNode);
    let param2 =
      this.data[toNode].indexOf(fromNode);

    this.data[fromNode] =
      this.data[fromNode]
        .filter((el, i) => i !== param1);

    this.data[toNode] =
      this.data[toNode]
        .filter((el, i) => i !== param2);

    delete this.edgeWeights[toNode][fromNode]
    delete this.edgeWeights[fromNode][toNode]
  }

  forEachNode(cb){
    this.nodesArray.forEach(node => cb(node));
  }

  DFSUtil(node, visited, visited_data){
    visited[node] = true;
    if(!visited_data.includes(node)){
      visited_data.push(node);
    }

    this.data[node].forEach((i_node, i) => {
      if(visited[i_node] === false){
        this.DFSUtil(i_node, visited, visited_data);
      }
    });

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

    this.data[node].forEach((i_node, i) => {
      node_queue.push(i_node)
    })
    node_queue.forEach((i_node, i) => {
      this.BFSUtil(i_node, visited, visited_data, node_queue)
    })

    return visited_data
  }

  DFS(node){
    let visited =
      Array.from(this.nodesArray, x => x = false);
    let visited_data = [];

    return this.DFSUtil(node, visited, visited_data);
  }

  BFS(node){
    let visited =
      Array.from(this.nodesArray, x => x = false);
    let visited_data = [];
    let node_queue = [node]

    return this.BFSUtil(node, visited, visited_data, node_queue)
  }

  Dijkstra(starting_node, destination_node, path = [], tempHash = {}){
    //still a proof of concept / work in progress

    // if (path.length === this.nodesArray.length) {
    //   return path;
    // }

    // let temp = [];
    // console.log("\nSTARTING NODE IS: ", starting_node)
    // this.data[starting_node].forEach(node => {
    //   temp.push(this.edgeWeights[starting_node][node])
    //   console.log("\nAYOYOOO: ", this.edgeWeights[starting_node][node])
    //   tempHash[this.edgeWeights[starting_node][node]] = node
    // })
    // console.log("TEMP IS: ", temp)
    // let nextNode = Math.min(...temp)
    // console.log("NEXT NODE IS: ", nextNode)
    // path.push(tempHash[nextNode])

    // if (
    //   tempHash[nextNode] !== destination_node && tempHash[nextNode] !== starting_node
    // ) {
    //   this.Dijkstra(
    //     tempHash[nextNode],
    //     destination_node,
    //     path
    //   )
    // }

    // if (path.length === 1) {
    //   path.push(destination_node)
    // }

    // return path;
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
console.log(g)
g.DFS(0);
// // 0 -> 1 -> 2 -> 3 -> 6 -> 5
g.BFS(0);
// 0 -> 1 -> 2 -> 100 -> 5 -> 3 -> 6
g.DFS(1)
// 1 -> 0 -> 2 -> 3 -> 6 -> 5
g.BFS(1)
// 1 -> 0 -> 2 -> 5 -> 100 -> 3 -> 6
g.DFS(2)
// 2 -> 0 -> 1 -> 5 -> 3 -> 6
g.BFS(2)
// 2 -> 0 -> 1 -> 3 -> 6 -> 100 -> 5
g.DFS(3)
// 3 -> 2 -> 0 -> 1 -> 5 -> 6
g.BFS(3)
// 3 -> 2 -> 0 -> 1 -> 6 -> 100 -> 5
g.DFS(5)
// 5 -> 1 -> 0 -> 2 -> 3 -> 6
g.BFS(5)
// 5 -> 1 -> 0 -> 2 -> 100 -> 3 -> 6
g.DFS(6)
// 6 -> 2 -> 0 -> 1 -> 5 -> 3
g.BFS(6)
// 6 -> 2 -> 0 -> 1 -> 3 -> 100 -> 5
g.DFS(100)
// 100 -> 0 -> 1 -> 2 -> 3 -> 6 -> 5
g.BFS(100)
// 100 -> 0 -> 1 -> 2 -> 5 -> 3 -> 6

g.addEdgeWeights(1, 2)
g.addEdgeWeights(2, 0)
g.addEdgeWeights(2, 3)
g.addEdgeWeights(3, 2)
g.addEdgeWeights(1, 0)
g.addEdgeWeights(0, 1)
g.addEdgeWeights(2, 1)
g.addEdgeWeights(2, 0)
console.log("\nTHE WEIGHTS FOR EACH NODE ARE: \n", g.edgeWeights)
// g.Dijkstra(0, 2)
