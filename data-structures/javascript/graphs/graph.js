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

class Stack {
  constructor() {
    this.items = [];
    this.size = 0;
  }

  insert(item) {
    this.items.push(item);
    this.size++;
  }

  contains(node) {
    return this.items.includes(node);
  }

  pop() {
    this.size--;
    return this.items.pop();
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


//DisjointSet implementation #3 with a ranking strategy
class DisjointSet {
  constructor(data) {
    this.parent = data;
    this.data = data;
    this.children = {};
    this.rank = 0;
  }

  find(node) {
    if (this.parent === node) {
      return node;
    } else {
      return this.find(this.parent)
    }
  }

  setUnion(set) {
    if (this.rank > set.rank) {
      set.parent = this;
      this.children[set.parent] = set;
    } else if (this.rank < set.rank) {
      set.children[this.parent] = this;
      this.parent = set;
    } else {
      set.children[this.parent] = this;
      this.parent = set;
      set.rank++;
    }
  }

  listChildrenOfSet() {
    let temp = [];
    let current = this.children[Object.keys(this.children)];
    let counter = 0;

    while(current) {
      let collection = Object.keys(current.children);

      if (collection.length > 0) {
        temp.push(current.data)
        current = current.children[collection[counter]];
        counter++;
      } else {
        counter = 0;
        temp.push(current.data)
        current = current.children[collection[counter]];
      }
    }

    return { parent: this.data, members: temp };
  }
}


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

    this.vertexes[fromNode][toNode] = {}
    this.vertexes[toNode][fromNode] = {};
    this.addEdgeWeights(...args);
    this.addHeuristicCosts(...args);
  }

  addEdgeWeights(fromNode, toNode) {
    // Assign a random Weight/Cost/Distance between to Vertexes/Nodes
    let weight = Math.floor(Math.random() * Math.floor(200) + 1);
    this.vertexes[fromNode][toNode]['weight'] = weight;
    this.vertexes[toNode][fromNode]['weight'] = weight;
  }

  addHeuristicCosts(fromNode, toNode) {
    let weight = Math.floor(Math.random() * (-400, 50) + 1);
    this.vertexes[fromNode][toNode]['heuristic'] = weight;
    this.vertexes[toNode][fromNode]['heuristic'] = weight;
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

  DFSUtil(source_node, visited, visited_data){
    if (visited_data.size === this.nodesArray.length) {
      return;
    }

    if (!visited[source_node]) {
      visited_data.insert(source_node);
      visited[source_node] = true;
    }

    for(let node in this.vertexes) {
      if(!visited[node]){
        this.DFSUtil(node, visited, visited_data);
      }
    }
  }

  DFS(node){
    let visited = {};
    let visited_data = new Stack();

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


    this.DFSUtil(node.toString(), visited, visited_data);
    return visited_data.items;
  }

  BFSUtil(source_node, result, visited, node_queue) {
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

    for(let node in this.vertexes[source_node]) {
      if (!visited[node]) {
        visited[node] = true;
        node_queue.enqueue(node);
        result.enqueue(node);
      }
    }

    node_queue.items.forEach((node, node_index) => {
      this.BFSUtil(node, result, visited, node_queue);
    })
  }

  BFS(source_node) {
    /*
      * BFS checks a node and immediately after, all of the nodes it has as edges
      * once all nodes are exhausted for the parent node, it will move on to the
      * next unvisited edged node in the parent vertex/node
      * and it will also do the same for each node in our nodesArray array
      *
      * Typically we would use a Queue for a Breadth First Search (FIFO)
    **/

    let visited = {};
    let result = new Queue, node_queue = new Queue();

    this.BFSUtil(source_node.toString(), result, visited, node_queue);

    return result.items;
  }

  costLength(u, v) {
    // Returns the cost/weight/distance at a given Vertexes/Nodes Edge
    return this.vertexes[u][v]['weight'];
  }

  heuristicLength(u, v) {
    return this.vertexes[u][v]['heuristic'];
  }

  extractDijkstraMin(djSet, dist) {
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

  allDijkstra(source_node) {
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
      let u = this.extractDijkstraMin(djSet, dist);

      for (let neighbor in this.vertexes[u]) {
        let alt = dist[u] + this.costLength(u, neighbor);

        if (alt < dist[neighbor]) {
          dist[neighbor] = alt;
          prev[neighbor] = u;
        }
      }
      djSet.delete(u);
    }

    // Finds the shortest paths for all nodes in our Graph
    this.getShortestPaths(prev, shortestPaths, dist);

    return {
      shortestDistances: dist,
      shortestPaths
    };
  }

  Dijkstra(source_node, destination_node) {
    /**
      * A Famous algorithm by Edsger W. Dijkstra for finding the shortest paths
      * between nodes in a graph
      * https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
      */
    let djSet = new Set();
    let shortestPath = {};
    shortestPath[destination_node] = [];
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
      let u = this.extractDijkstraMin(djSet, dist);

      for (let neighbor in this.vertexes[u]) {
        let alt = dist[u] + this.costLength(u, neighbor);

        if (alt < dist[neighbor]) {
          dist[neighbor] = alt;
          prev[neighbor] = u;
        }
      }
      djSet.delete(u);
    }

    // Finds the shortest path for a given node in our Graph
    this.getShortestPath(prev, shortestPath, destination_node, dist);

    return {
      shortestDistance: dist[destination_node],
      shortestPath
    };
  }


  each_A_Star_Search(source_node) {
    /**
      * A Famous algorithm by Peter Hart, Nils Nilsson and Bertram Raphael for finding the shortest paths
      * between nodes in a graph. It is an extension of Edsger Dijkstra's 1959 algorithm.
      * A* achieves better performance by using heuristics to guide its search.
      * https://en.wikipedia.org/wiki/A*_search_algorithm
      */
    let djSet = new Set();
    let shortestPaths = {};
    let dist = {};
    let prev = {};
    let visitedNeighbors = {};

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
      let u = this.extractDijkstraMin(djSet, dist);

      for (let neighbor in this.vertexes[u]) {
        let alt = dist[u] + this.costLength(u, neighbor) + this.heuristicLength(u, neighbor);

        if (!visitedNeighbors[neighbor] && alt < dist[neighbor]) {
          dist[neighbor] = alt;
          prev[neighbor] = u;
        }
        visitedNeighbors[neighbor] = true;

      }
      djSet.delete(u);
    }

    // Finds the shortest paths for all nodes in our Graph
    this.getShortestPaths(prev, shortestPaths, dist);

    return {
      shortestDistances: dist,
      shortestPaths
    };
  }


  // Work in progress
  A_Star_Search(source_node, destination_node) {
    /**
      * A Famous algorithm by Peter Hart, Nils Nilsson and Bertram Raphael for finding the shortest paths
      * between nodes in a graph. It is an extension of Edsger Dijkstra's 1959 algorithm.
      * A* achieves better performance by using heuristics to guide its search.
      * https://en.wikipedia.org/wiki/A*_search_algorithm
      */
    let aStarSet = new Set();
    let shortestPath = {};
    shortestPath[destination_node] = [];
    let dist = {};
    let prev = {};
    let visitedNeighbors = {};

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
      aStarSet.add(vertex, this.vertexes[vertex]);
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
    while(aStarSet.size) {
      // Find Vertex/Node with minimumDistance
      let u = this.extractDijkstraMin(aStarSet, dist);

      for (let neighbor in this.vertexes[u]) {
        let alt = dist[u] + this.costLength(u, neighbor) + this.heuristicLength(u, neighbor);
        if (!visitedNeighbors[neighbor] && alt < dist[neighbor]) {
          dist[neighbor] = alt;
          prev[neighbor] = u;
        }
        visitedNeighbors[neighbor] = true;
      }
      aStarSet.delete(u);
    }

    // Finds the shortest path for a given node in our Graph
    this.getShortestPath(prev, shortestPath, destination_node, dist);

    return {
      shortestDistance: dist[destination_node],
      shortestPath
    };
  }



  getShortestPath(previous, shortestPath, endVertex, dist) {
    // shortestPath is initially an object with endVertex's/Node's being an empty array
    let node = endVertex
    var path = shortestPath[node];

    // while our prev object has a property with
    // our Vertex/Node, we will push that to our path for
    // the currently iterated Vertex/Node in our shortestPaths Object property
    while(previous[node]) {
      path.push(node + "");
      node = previous[node];
    }

    // gets the starting node in there as well if there was a path from it
    if (dist[node] === 0) {
      path.push(node);
    }

    path.reverse();
  }

  getShortestPaths(previous, shortestPaths, dist) {
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
    const { shortestDistances } = this.allDijkstra(source_node)
    let shortestDistance = shortestDistances[destination_node];
    return shortestDistance;
  }

  KruskalMST() {
    /*
     * Only works with Directed Graphs
     * https://en.wikipedia.org/wiki/Kruskal%27s_algorithm
     *
     * This algorithm was written by Joseph Kruskal and is a minimum-spanning-tree
     * algorithm which finds an edge of the least possible weight that connects
     * any two trees in the forest. It is a greedy algorithm in graph theory
     * as it finds a minimum spanning tree for a connected weighted graph
     * adding increasing cost arcs at each step. This means it finds a subset
     * of the edges that forms a tree that includes every vertex, where the
     * total weight of all the edges in the tree is minimized. If the graph
     * is not connected, then it finds a minimum spanning forest
     * (a minimum spanning tree for each connected component).
     *
    **/
    let MST = new Graph();
    let disjointSets = {};
    let edges = [];
    let edgesMap = {};

    for (let vertex in this.vertexes) {
      let currentEdges = [];

      for (let edge in this.vertexes[vertex]) {
        if (edgesMap[`${vertex}_${edge}`] === false && edgesMap[`${edge}_${vertex}`] === false) {
          continue;
        } else {
          edgesMap[`${vertex}_${edge}`] = false;
          edgesMap[`${edge}_${vertex}`] = false;

          edges.push([`${vertex}_${edge}`, this.vertexes[vertex][edge]['weight']]);
          currentEdges.push([`${vertex}_${edge}`, this.vertexes[vertex][edge]['weight']], [`${edge}_${vertex}`, this.vertexes[vertex][edge]['weight']]);
        }
      }

      disjointSets[vertex] = new DisjointSet({ vertex, edges: currentEdges });
    }

    edges.sort((a, b) => {
      if (a[1] === b[1]) {
        return 1;
      } else {
        return a[1] - b[1]
      }
    });

    for (let vertex in edges) {
      let current = edges[vertex][0];

      let vertexesOfEdge = [
        current.slice(0, current.indexOf("_")),
        current.slice(current.indexOf("_") + 1)
      ];

      let root1 =
        disjointSets[vertexesOfEdge[0]]
          .find({ vertex: vertexesOfEdge[1], edges: this.vertexes[vertexesOfEdge[1]] });


      let root2 =
        disjointSets[vertexesOfEdge[1]]
          .find({ vertex: vertexesOfEdge[0], edges: this.vertexes[vertexesOfEdge[0]] });

      if (!(root1 && root1.parent) || !(root2 && root2.parent)) {
        disjointSets[vertexesOfEdge[0]].setUnion(disjointSets[vertexesOfEdge[1]]);
        MST.addNode(edges[vertex][0]);
        MST.vertexes[edges[vertex][0]]['distance'] = edges[vertex][1]
      }
    }

    return MST
  }
}


const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};



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
g.addEdge(3, 1);
g.addEdge(1, 100);
g.addEdge(5, 1);
g.addEdge(6, 2);
g.addEdge(6, 5);
console.log("\n\n", g.vertexes, "\n\n")
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
console.log(g.BFS(0));
console.log(g.DFS(1))
console.log(g.BFS(1))
console.log(g.DFS(2))
console.log(g.BFS(2))
console.log(g.DFS(3))
console.log(g.BFS(3))
console.log(g.DFS(5))
console.log(g.BFS(5))
console.log(g.DFS(6))
console.log(g.BFS(6))
console.log(g.DFS(100))
console.log(g.BFS(100))

console.log("\n\n\n", g.Dijkstra(1, 5))
console.log(g.allDijkstra(1))
console.log(g.shortestDistanceToAndFrom(1, 5))
console.log(g.allDijkstra(6))
console.log("DIJKSTRA THO: ", g.Dijkstra(6, 100))
console.log("A STAR THOU: ", g.A_Star_Search(6, 100))
console.log("A STAREACH THOU: ", g.each_A_Star_Search(6))
console.log("\n\n\n\nKruskalMST IS: ", g.KruskalMST())

// algos to implement
// Prim's MST (Minimum Spanning Tree)
