// FB

/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */


 const bfs = (node, visited) => {
  // if node is null return node
  if (!node) return node;
  
  // set starting node in queue
  let queue = [node];
  
  // clone a new node and mark it as visited
  visited[node.val] = new Node(node.val, []);
  
  // while there are nodes to traverse
  // keep iterating
  while (queue.length) {
      // pop off the first node from queue
      let currentNode = queue.shift();

      // for each neighbor we haven't visited
      // add and mark it as visited
      for (let edge of currentNode.neighbors) {
          if (visited[edge.val] === undefined) {
              visited[edge.val] = new Node(edge.val, []);
              
              // add the visited node/neighbor to the queue to visit
              // it's neighbors/edges as well in the bfs iteration
              queue.push(edge);
          }
          
          // add the visited neighbor to the currentNode's neighbors
          // and mark it as visited
          visited[currentNode.val].neighbors.push(visited[edge.val]);
      }
  }
  
  // return cloneNode
  return visited[node.val];
}


const dfs = (node, visited) => {
  // if node is null return node
  if (!node) return node;
  
  // if node has precomputed value
      // return value of node
  if (visited[node.val] !== undefined) {
      return visited[node.val];
  }
  
  
  // clone a new node
  let clonedNode = new Node(node.val, []);
  
  // mark it as visited
  visited[node.val] = clonedNode;
  
  // for each unvisited edge or neighbor
  // add it to the clonedNode's neighbors array
  // with a dfs recursive call
  for (let edge of node.neighbors) {
      if (visited[edge.val] !== true) {
          clonedNode.neighbors.push(dfs(edge, visited));
      }
  }
  
  // return the clonedNode
  return clonedNode;
}


/**
* @param {Node} node
* @return {Node}
*/
var cloneGraph = function(node) {
  return bfs(node, {});
};

/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

 const recurse = function (node, visited) {
    if (!node || !node.val) {
        return node;
    }
    
    if (visited[node.val]) {
        return visited[node.val];
    }
    
    let clonedNode = new Node(node.val, []);

    if (node.neighbors.length === 0) return clonedNode;
    visited[node.val] = clonedNode;
    
    if (node.neighbors.length) {
        for (let n of node.neighbors) {
            clonedNode.neighbors.push(recurse(n, visited));
        }
    }
    return clonedNode;
}

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraphRecurse = function(node) {
    const visited = {};

    if (!node || !node.val) {
        return node;
    }
    
    if (visited[node.val]) {
        return visited[node.val];
    }
    
    let clonedNode = new Node(node.val, []);
    if (node.neighbors.length === 0) return clonedNode;
    visited[node.val] = clonedNode;
    
    if (node.neighbors.length) {
        for (let n of node.neighbors) {
            clonedNode.neighbors.push(recurse(n, visited));
        }
    }

    return clonedNode;
};