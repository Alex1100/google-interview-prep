class Graph {
  constructor() {
    this.data = {};
    this.edgeWeights = {}
    this.nodesArray = [];
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
    if (fromNode === toNode || this.data[fromNode].includes(toNode) && this.data[toNode].includes(fromNode)) {
      return
    }

    this.data[fromNode].push(toNode);
    this.data[toNode].push(fromNode);

    this.addEdgeWeights(fromNode, toNode)
  }

  addEdgeWeights(fromNode, toNode) {
    if (!this.edgeWeights[toNode]) {
      this.edgeWeights[toNode] = {}
    }

    if (!this.edgeWeights[fromNode]) {
      this.edgeWeights[fromNode] = {}
    }

    let weight = Math.floor(Math.random() * Math.floor(10) + 1);
    this.edgeWeights[fromNode][toNode] = weight
    this.edgeWeights[toNode][fromNode] = weight
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

  Dijkstra(
    starting_node,
    destination_node,
    visited = [],
    shortest_distance_from_start = {},
    previous_vertex_map = {},
    previous_path_distance_sum = {},
    parent_node = null
  ){

    /* STILL A WORK IN PROGRESS */
    if (visited[visited.length - 1] === destination_node || starting_node === undefined) {
      return
    }

    let currentNode = starting_node;
    let setSumKeys = false;
    if (Object.keys(previous_path_distance_sum).length === 0) {
      setSumKeys = true;
    }

    for (let i = 0; i < this.nodesArray.length; i++) {
      if (setSumKeys) {
          previous_path_distance_sum[this.nodesArray[i]] = 0
      }
      if (previous_path_distance_sum[this.nodesArray[i]] && previous_vertex_map[this.nodesArray[i]] >= 1 && previous_vertex_map[this.nodesArray[i]] !== Infinity) {
        // distance from previousNode to currentNode
        previous_path_distance_sum[this.nodesArray[i]] += shortest_distance_from_start[this.nodesArray[i]]
      }
    }

    if (Object.keys(shortest_distance_from_start).length === 0) {
      for (let i = 0; i < this.nodesArray.length; i++) {
        if (this.nodesArray[i] === currentNode) {
          shortest_distance_from_start[currentNode] = 0
        } else {
          shortest_distance_from_start[this.nodesArray[i]] = Infinity
        }
      }
    }

    // now we need to visit the unvisited neighbors of
    // starting vertex
    let unvisited_neighbors =
      Object.values(this.data[currentNode]).filter(el => !visited.includes(el))

    let nearestNeighbor;

    if (unvisited_neighbors && unvisited_neighbors.length > 0) {
      nearestNeighbor = unvisited_neighbors[0]
    } else {
      visited = [...visited, destination_node]
    }

    // need to track current cost and see if it is an
    // unvisited_neighbor of currentNode and also pass that along to other
    // function calls recursively
    //
    // if the cost to reach destination exceeds the original cost from the parent neighbor
    // the we need to just return the visited array up to the index of the parent node
    // and just add/push the destination_node to the visited array
    // and we're done
    if (unvisited_neighbors.includes(destination_node)) {
      parent_node = currentNode
    }

    unvisited_neighbors.forEach(neighbor => {
      if (Object.values(this.data[neighbor]).filter(el => el !== currentNode).length > 0) {
        // find all known distances to the current neighbor if there is something that has a shorter path then
        // don't add cost or distance to the known distance
        // and ignore it aka don't add it to the visited array

        // after it updates if the current known min Distance of destination
        // is less then what is already calculated then backtrack
        // find the parent edge of the destination
        // and it's parent until it reaches the parent with the current known min destination
        // add those parents into an array and
        // filter out the visited array to remove those parents that were added
        // and add the destination to the end and return the final result path
        // to reach the destination_node

        if (neighbor === destination_node) {
          console.log('\n\nDERPPPPPPPPPPP: ', shortest_distance_from_start[neighbor])
          console.log("\n\nACCOMPYNING DERRRRRP: ", previous_path_distance_sum)
          if (shortest_distance_from_start[neighbor] <= this.edgeWeights[currentNode][neighbor] + previous_path_distance_sum[currentNode]) {
            let checkNode = currentNode;
            while(this.edgeWeights[checkNode][neighbor] && this.edgeWeights[checkNode][neighbor] + previous_path_distance_sum[neighbor] !== shortest_distance_from_start[neighbor]) {
              let last_visited = visited[visited.length - 1]
              console.log("\nVISITED IS: ", visited)
              console.log("\n\nTEST TEST: ", last_visited)
              console.log("\nCHECKNODE IS: ", checkNode)
              console.log("\n\nWHAT WHAT: ", this.edgeWeights[last_visited][checkNode])
              console.log("\n\nSHOULD MATCH YAAA: ", shortest_distance_from_start[destination_node])
              console.log("\n\nAYYYYYYAAAAA: ", this.edgeWeights[last_visited][destination_node] + previous_path_distance_sum[neighbor])
              console.log("\n\nPREV DIST SUM: ", previous_path_distance_sum[neighbor])


              if (
                this.edgeWeights[last_visited].hasOwnProperty(destination_node) &&
                (this.edgeWeights[last_visited][destination_node]) === shortest_distance_from_start[destination_node]) {
                return [...visited, destination_node]
              } else {
                if (visited.indexOf(checkNode) > 0) {
                  visited.pop();
                  previous_path_distance_sum[neighbor] -= this.edgeWeights[checkNode][last_visited]
                }
              }

              checkNode = visited[visited.length - 1]
              console.log("\nVISITED IS: ", visited)
              console.log("\nCHECKNODE IS: ", checkNode)
            }

             return [...visited, destination_node]
          }
        }

        if (shortest_distance_from_start[neighbor] >= this.edgeWeights[currentNode][neighbor] + previous_path_distance_sum[neighbor]) {
          shortest_distance_from_start[neighbor] = this.edgeWeights[currentNode][neighbor] + previous_path_distance_sum[neighbor]

          // next step is to find the node/vertex with the shortest distance from the currentNode/starting_node
          if (shortest_distance_from_start[neighbor] < this.edgeWeights[currentNode][nearestNeighbor] + previous_path_distance_sum[neighbor]) {
            nearestNeighbor = neighbor
          }
        }
      }
    })

    // next step is to add the current vertex to the list of visited
    // vertexes or edges/nodes

    if (currentNode) {
      visited.push(currentNode);
      previous_vertex_map[nearestNeighbor] = currentNode;

      this.Dijkstra(
        nearestNeighbor,
        destination_node,
        visited,
        shortest_distance_from_start,
        previous_vertex_map,
        previous_path_distance_sum,
        parent_node
      )
    } else {
      visited = [...visited, destination_node]
    }

    // so now that we have the next node we will start from
    // we need to calculate the distance of our new starting_node
    // from it's neighbors plus the distance from the previous
    // starting_nodes
    if (visited[visited.length - 1] === destination_node) {
      console.log("THE OVERALL WEIGHT OF THE PATH WAS: ", shortest_distance_from_start)
    }
    return visited;
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
// console.log(zeNewGraph);
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
// // 0 -> 1 -> 2 -> 3 -> 6 -> 5
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

console.log(g.Dijkstra(3, 1))
