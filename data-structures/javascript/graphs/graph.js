class Graph {
  constructor() {
    this.vertexes = {};
    this.nodesArray = [];
  }

  addNode(node){
    // Adds a given Vertex/Node if it already doesn't exists
    if (!this.vertexes[node]) {
      this.vertexes[node] = {};
      this.nodesArray.push(node);
    }
  }

  contains(item){
    // Checks to see if a given Vertex/Node exists
    return this.vertexes[item] ? true : false;
  }

  removeNode(node){
    // Removes a Vertex/Node only if it exists
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
    // Checks to see if a given Vertex/Node has an Edge with another Vertex/Node
    return this.vertexes[fromNode].hasOwnProperty(toNode);
  }

  sameNodes(fromNode, toNode) {
    // Checks to see if both Vertexes/Nodes are the same
    return fromNode === toNode
  }

  hasAllEdges(fromNode, toNode) {
    // Checks to see if Edges between Two Vertexes/Nodes are present
    return this.hasEdge(fromNode, toNode) && this.hasEdge(toNode, fromNode);
  }

  addEdge(fromNode, toNode){
    // Add an Edge between two Vertexes/Nodes
    let args = [fromNode, toNode]
    if (this.sameNodes(...args) || this.hasAllEdges(...args)) {
      return;
    }

    this.vertexes[fromNode][toNode] = null
    this.vertexes[toNode][fromNode] = null;
    this.addEdgeWeights(...args);
  }

  addEdgeWeights(fromNode, toNode) {
    // Assign a random Weight/Cost/Distance between to Vertexes/Nodes
    let weight = Math.floor(Math.random() * Math.floor(10) + 1);
    this.vertexes[fromNode][toNode] = weight;
    this.vertexes[toNode][fromNode] = weight;
  }

  removeEdge(fromNode, toNode){
    // remove edges between two Vertexes/Nodes
    delete this.vertexes[fromNode][toNode];
    delete this.vertexes[toNode][fromNode];
  }

  forEachNode(cb){
    // call a callback function on each node in our nodesArray
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
    let visited = Array.from(this.nodesArray, x => x = false);
    let visited_data = [];

    /**
      * DFS checks a node and then jumps into the node it checked form it's parent
      * to see the next edged node and it will keep doing this for all
      * unvisited_nodes
      *
      * DFS likes to jump between Vertexes through a Node's edges
      * While BFS likes to go through each edge for a given Node/Vertex before moving
      * on to another Node that might or might not be included in the current Node/Vertex
      *
      * Typically we would use a Stack for Depth First Search (LIFO)
      */


    return this.DFSUtil(node.toString(), visited, visited_data);
  }

  BFS(node){
    let visited = Array.from(this.nodesArray, x => x = false);
    let visited_data = [], node_queue = []

    /**
      * BFS checks a node and immediately after, all of the nodes it has as edges
      * once all nodes are exhausted for the parent node, it will move on to the
      * next unvisited edged node in the parent vertex/node
      * and it will also do the same for each node in our nodesArray array
      *
      * Typically we would use a Queue for a Breadth First Search (FIFO)
      */

    return this.BFSUtil(node.toString(), visited, visited_data, node_queue)
  }

  length(u, v) {
    // Returns the cost/weight/distance at a given Vertexes/Nodes Edge
    return this.vertexes[u][v];
  }

  extractMin(djSet, dist) {
    // inintialize the minimumDistance to Infinity
    let minimumDistance = Infinity;
    let nodeWithMinimumDistance;

    djSet.forEach((k, v) => {
      /**
        * if the known min distance of a node
        * is less than or equal to the
        * current minimumDistance
        * then the new minimumDistance
        * is the previously known
        * minimum distance for a given node
        * also, the nodeWithMinimumDistance is set to the current
        * node (k)
        */

      if (dist[k] <= minimumDistance) {
        minimumDistance = dist[k];
        nodeWithMinimumDistance = k;
      }
    })

    return nodeWithMinimumDistance;
  }

  Dijkstra(source_node) {
    /**
      * A Famous algorithm by Edsger W. Dijkstra for finding the shortest paths
      * between nodes in a graph
      * https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
      */

    let djSet = new Set();
    let shortestPaths = {};
    let dist = {};
    let prev = {};

    for (let vertex in this.vertexes) {
      /**
        * 1) Assign all distances to All Vertexes/Nodes to Infinity
        *
        * 2) Assign the previous Vertex/Node to undefined/null,
        *    since we didn't calculate anything yet
        *
        * 3) Add Each Vertex/Node to our Set Data Structure
        *
        * 4) Initialize an empty array for each Vertex/Node in our graph
        */
      dist[vertex] = Infinity;
      prev[vertex] = undefined;
      djSet.add(vertex, this.vertexes[vertex]);
      shortestPaths[vertex] = [];
    }

    // Since we start off at our source_node, we know it takes 0 cost/weight/distance
    // to get to where we already are
    dist[source_node] = 0;


    /**
     * While there are items in our Set, we need to find the closest Vertex/Node
     * and for each edge and it's associated cost/weight/distance of our found Vertex/Node
     * we need to add the distance of our current closest Vertex/Node
     * and add that to the length of it's neighbor (current iterated edge / edged Vertex/Node).
     * Afterwards, we check to see if the current distance plus the previous distance
     * is less than the distance at our neighbor, if so, then we make the neighbor's distance
     * equal to the alt (accummulated distance)
     * and we make the previous neighbor == u (closest Node/Vertex in our Set).
     *
     * After each iteration, we make sure to remove the closest Vertex/Node in our Set
     * @param u
     * @param neighbor
     * @param alt
     *
     */
    while(djSet.size) {
      // Find Vertex/Node with minimumDistance
      let u = this.extractMin(djSet, dist);

      for (let neighbor in this.vertexes[u]) {
        let alt = dist[u] + this.length(u, neighbor);

        if (alt < dist[neighbor]) {
          dist[neighbor] = alt;
          prev[neighbor] = u;
        }
      }
      djSet.delete(u);
    }

    // Finds the shortest paths for all nodes in our Graph
    this.getShortestPaths(prev, shortestPaths, source_node, dist);

    return {
      shortestDistances: dist,
      shortestPaths
    };
  }

  getShortestPaths(previous, shortestPaths, startVertex, dist) {
    // shortestPaths is initially an object with values being all empty arrays
    for (var node in shortestPaths) {
      var path = shortestPaths[node];

      // while our prev object has a property with
      // our Vertex/Node, we will push that to our path for
      // the currently iterated Vertex/Node in our shortestPaths Object property
      while(previous[node]) {
        path.push(node);
        node = previous[node];
      }

      // gets the starting node in there as well if there was a path from it
      if (dist[node] === 0) {
        path.push(node);
      }

      path.reverse();
    }
  }

  shortestDistanceToAndFrom(source_node, destination_node) {
    const { shortestDistances } = this.Dijkstra(source_node)
    let shortestDistance = shortestDistances[destination_node];
    return shortestDistance;
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
/**
  * actual vertex->edge weights/costs/distances will be randomly generated
  * each time. This just shows the structure it is generated in
  *
  *
  * Graph {
  *   vertexes: {
  *     '0': {},
  *     '1': {},
  *     '4': {},
  *     '9': {},
  *     '25': {},
  *     '36': {},
  *     '10000': {}
  *   },
  *   nodesArray: [ 0, 1, 4, 9, 25, 36, 10000 ]
  * }
  */


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
/**
  * actual vertex->edge weights/costs/distances will be randomly generated
  * each time. This just shows the structure it is generated in
  *
  *
  * Graph {
  *   vertexes: {
  *     '0': { '1': 6, '2': 9, '100': 8 },
  *     '1': { '0': 6, '2': 3, '5': 1 },
  *     '2': { '0': 9, '1': 3, '3': 9, '6': 2 },
  *     '3': { '2': 9 },
  *     '5': { '1': 1, '6': 3 },
  *     '6': { '2': 2, '5': 3 },
  *     '100': { '0': 8 } },
  *   nodesArray: [ 0, 1, 2, 3, 5, 6, 100 ]
  * }
  */



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

console.log(g.Dijkstra(1))
console.log(g.shortestDistanceToAndFrom(1, 5))
