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
