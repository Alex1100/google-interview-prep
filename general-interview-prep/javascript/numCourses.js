/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
  // generates graph for top sort
  const graph = [...new Array(numCourses)].map(() => []);
  for (let [c1, c2] of prerequisites) {
    graph[c1].push(c2);
  }

  let stack = new Set();
  let visited = new Set();

  const hasCycle = (graph, u, visited, stack) => {
    if (visited.has(u)) {
      return !stack.has(u);
    }
    visited.add(u);
    for (let v of graph[u]) {
      if (hasCycle(graph, v, visited, stack)) {
        return true;
      }
    }
    stack.add(u);
    return false;
  };

  for (let i = 0; i < numCourses; i++) {
    if (hasCycle(graph, i, visited, stack)) {
      return false;
    }
  }
  return true;
};




const dfs = (prerequisites, visit, precourse) => {
    if (visit[precourse] == 1) return false;
    if (visit[precourse] == 2) return true;
    visit[precourse] = 1;
    for (let i = 0; i < prerequisites.length; i++){
        if (prerequisites[i][1] === precourse){
            let nextPath =  dfs(prerequisites, visit, prerequisites[i][0]);
            if (!nextPath) return false;
        }
    }
    visit[precourse] = 2;
    return true;
}

var canFinish = function(numCourses, prerequisites) {
    // let graph = constructGraph(prerequisites);


    if (prerequisites.length === 0) return true;
    let visit = new Array(numCourses).fill(0);
    for (let i = 0; i < prerequisites.length; i++){
        if (visit[prerequisites[i][1]] === 0){
            let classPath = dfs(prerequisites, visit, prerequisites[i][1]);
            if (classPath === false) return false;
        }
    }
    return true;
};
