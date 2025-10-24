// https://leetcode.com/problems/course-schedule/description/



// There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

// For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
// Return true if you can finish all courses. Otherwise, return false.


// Example 1:

// Input: numCourses = 2, prerequisites = [[1,0]]
// Output: true
// Explanation: There are a total of 2 courses to take. 
// To take course 1 you should have finished course 0. So it is possible.
// Example 2:

// Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
// Output: false
// Explanation: There are a total of 2 courses to take. 
// To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.


// Constraints:

// 1 <= numCourses <= 2000
// 0 <= prerequisites.length <= 5000
// prerequisites[i].length == 2
// 0 <= ai, bi < numCourses
// All the pairs prerequisites[i] are unique.


// Hint 1:
// This problem is equivalent to finding if a cycle exists in a directed graph. 
// If a cycle exists, no topological ordering exists and therefore it will be impossible to take all courses.

// Hint 2:
// Topological Sort via DFS - A great tutorial explaining the basic concepts of Topological Sort.

// Hint 3:
// Topological sort could also be done via BFS.



/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
const constructGraph = (numNodes, pre) => {
  let nodes = [];
  for (let i = 0; i < numNodes; i++) {
      let node = {};
      node.neighbors = [];
      nodes.push(node);
  }

  for (let j = 0; j < pre.length; j++) {
      let requiredCourse = pre[j][1];
      let course = pre[j][0];
      // pushing course that require required-course to it's neighbor
      // when we go to the required-course, and traverse it's neighbors,
      // we want to make sure that those neighbor doesn't have others that nodes
      // that required those neighbor plus those neighbor's required-course
      // example [1,0], [0,2], [2,1]
      // 1 required 0, 0 required 2, and 2 required 1
      // it creates loop
      nodes[requiredCourse].neighbors.push(nodes[course]);
  }

  return nodes;
}

const dfs = (startNode, parents) => {
  if (parents.indexOf(startNode) >= 0) {
      return true;
  }
  if (startNode.visited) {
      return false;
  }

  startNode.visited = true;
  let neighbors = startNode.neighbors;
  parents.push(startNode);

  for (let i = 0; i < neighbors.length; i++) {
      let hasCycle = dfs(neighbors[i], parents);
      if (hasCycle) {
          return true;
      }
  }

  parents.pop();
}

const canFinish = (numCourses, prerequisites) => {
  let nodes = constructGraph(numCourses, prerequisites);

  for (let i = 0; i < nodes.length; i++) {
      let parent = [];
      let hasCycle = dfs(nodes[i], parent);

      if (hasCycle){
          return false;
      }
  }

  return true;
};
