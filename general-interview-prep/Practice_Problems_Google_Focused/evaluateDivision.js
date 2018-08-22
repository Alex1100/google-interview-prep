/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}


 */

const dfs = (adjList, node, to, product, visited) => {
  if (!adjList.has(node)) {
    return null; // Dead end
  }

  visited.add(node); // Mark the current node as visited

  const neighbors = [...adjList.get(node).keys()];

  for (let i = 0; i < neighbors.length; i++) {
    const v = neighbors[i];
    const current = product * adjList.get(node).get(v);

    if (v === to) {
      // Found the path, return the product
      return current;
    }

    if (!visited.has(v)) {
      // Continue to search for the path
      const value = dfs(adjList, v, to, current, visited);

      if (value) {
        return value;
      }
    }
  }

  return null;
};

const buildGraph = (equations, values) => {
  const adjList = new Map();

  for (let i = 0; i < equations.length; i++) {
    const [from, to] = equations[i];
    const value = values[i];

    if (!adjList.has(from)) {
      adjList.set(from, new Map());
    }

    if (!adjList.has(to)) {
      adjList.set(to, new Map());
    }

    // Build the undirected graph
    adjList.get(from).set(to, value);
    adjList.get(to).set(from, 1 / value);
  }

  return adjList;
};
const calcEquation = (equations, values, queries) => {
    // b = 4
    // a = 8
    // 0.75
    // e = undefined so -1
    // x = undefined so -1

    const result = [];

  // Step 1. Build the undirected graph with adjacency list
  const adjList = buildGraph(equations, values);

  // Step 2. For each query, try to find a path in the graph
  // that can link the nodes in the query
  for (let i = 0; i < queries.length; i++) {
    const [from, to] = queries[i];
    const value = dfs(adjList, from, to, 1, new Set());

    // If value is null, that means there's no such path
    result.push(value ? value : -1.0);

    if (value) {
      // Update the graph to avoid duplicate computation
      adjList.get(from).set(to, value);
      adjList.get(to).set(from, 1 / value);
    }
  }

  return result;
};
