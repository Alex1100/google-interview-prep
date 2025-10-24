// https://leetcode.com/problems/evaluate-division/description/
//
// You are given an array of variable pairs equations and an array of real numbers values, 
// where equations[i] = [Ai, Bi] and values[i] represent the equation Ai / Bi = values[i]. 
// Each Ai or Bi is a string that represents a single variable.
//
//You are also given some queries, where queries[j] = [Cj, Dj] represents the jth query 
// where you must find the answer for Cj / Dj = ?.
//
// Return the answers to all queries. If a single answer cannot be determined, return -1.0.


// Example 1:
//
// Input: equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
// Output: [6.00000,0.50000,-1.00000,1.00000,-1.00000]
// Explanation: 
// Given: a / b = 2.0, b / c = 3.0
// queries are: a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ? 
// return: [6.0, 0.5, -1.0, 1.0, -1.0 ]
// note: x is undefined => -1.0

// Example 2:
//
// Input: equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
// Output: [3.75000,0.40000,5.00000,0.20000]

// Example 3:
//
// Input: equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"],["x","y"]]
// Output: [0.50000,2.00000,-1.00000,-1.00000]


// Constraints:
// 
// 1 <= equations.length <= 20
// equations[i].length == 2
// 1 <= Ai.length, Bi.length <= 5
// values.length == equations.length
// 0.0 < values[i] <= 20.0
// 1 <= queries.length <= 20
// queries[i].length == 2
// 1 <= Cj.length, Dj.length <= 5
// Ai, Bi, Cj, Dj consist of lower case English letters and digits.


// Hint 1
// Do you recognize this as a graph problem?

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

/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
const calcEquation = (equations, values, queries) => {
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
