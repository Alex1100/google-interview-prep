package main

// Given a reference of a node in a connected undirected graph.
//
// Return a deep copy (clone) of the graph.
//
// Each node in the graph contains a val (int) and a list (List[Node]) of its neighbors.
//
// class Node {
//     public int val;
//     public List<Node> neighbors;
// }
//
//
// Test case format:
//
// For simplicity sake, each node's value is the same as the node's index (1-indexed). For example, the first node with val = 1, the second node with val = 2, and so on. The graph is represented in the test case using an adjacency list.
//
// Adjacency list is a collection of unordered lists used to represent a finite graph. Each list describes the set of neighbors of a node in the graph.
//
// The given node will always be the first node with val = 1. You must return the copy of the given node as a reference to the cloned graph.
//
//
//
// Example 1:
//
//
// Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
// Output: [[2,4],[1,3],[2,4],[1,3]]
// Explanation: There are 4 nodes in the graph.
// 1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
// 2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
// 3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
// 4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
// Example 2:
//
//
// Input: adjList = [[]]
// Output: [[]]
// Explanation: Note that the input contains one empty list. The graph consists of only one node with val = 1 and it does not have any neighbors.
// Example 3:
//
// Input: adjList = []
// Output: []
// Explanation: This an empty graph, it does not have any nodes.
// Example 4:
//
//
// Input: adjList = [[2],[1]]
// Output: [[2],[1]]
//
//
// Constraints:
//
// 1 <= Node.val <= 100
// Node.val is unique for each node.
// Number of Nodes will not exceed 100.
// There is no repeated edges and no self-loops in the graph.
// The Graph is connected and all nodes can be visited starting from the given node.
//


/**
 * Definition for a Node.
 * type Node struct {
 *     Val int
 *     Neighbors []*Node
 * }
 */

func dfs(node *Node, visited map[int]*Node) *Node {
    if node == nil {
        return node
    }

    // If the node was already visited before.
    // Return the clone from the visited dictionary.
    if visited[node.Val] != nil {
        return visited[node.Val]
    }

    // Create a clone for the given node.
    // Note that we don't have cloned neighbors as of now, hence [].
    clone_node := &Node{Val: node.Val, Neighbors: make([]*Node, 0)}

    // The key is original node and value being the clone node.
    visited[node.Val] = clone_node

    // Iterate through the neighbors to generate their clones
    // and prepare a list of cloned neighbors to be added to the cloned node.
    if len(node.Neighbors) > 0 {
        for _, n := range node.Neighbors {
            clone_node.Neighbors = append(clone_node.Neighbors, dfs(n, visited))
        }
    }
    return clone_node
}

func bfs(node *Node, visited map[int]*Node) *Node {

    if node == nil {
        return node
    }

    // Put the first node in the queue
    queue := []*Node{node}
    // Clone the node and put it in the visited dictionary.
    visited[node.Val] = &Node{Val: node.Val, Neighbors: make([]*Node, 0)}

    // Start BFS traversal
    for len(queue) > 0 {
        // Pop a node say "n" from the from the front of the queue.
        n := queue[0]
        queue = queue[1:]
        // Iterate through all the neighbors of the node
        for _, neighbor := range n.Neighbors {
            if visited[neighbor.Val] == nil {
                // Clone the neighbor and put in the visited, if not present already
                visited[neighbor.Val] = &Node{Val: neighbor.Val, Neighbors: make([]*Node, 0)}
                // Add the newly encountered node to the queue.
                queue = append(queue, neighbor)
            }
            // Add the clone of the neighbor to the neighbors of the clone node "n".
            visited[n.Val].Neighbors = append(visited[n.Val].Neighbors, visited[neighbor.Val])
        }
    }

    // Return the clone of the node from visited.
    return visited[node.Val]
}

func cloneGraphDFS(node *Node) *Node {
    visited := make(map[int]*Node)
    cloned_node := dfs(node, visited)
    return cloned_node
}

func cloneGraphBFS(node *Node) *Node {
    visited := make(map[int]*Node)
    cloned_node := bfs(node, visited)
    return cloned_node
}

func main() {

}
