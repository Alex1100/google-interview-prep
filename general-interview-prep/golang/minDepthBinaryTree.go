package main

/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */


 // [3,9,20,null,null,15,7],
 //
 //    3
 //   / \
 //  9  20
 //    /  \
 //   15   7


type NodeDequeue struct {
    Depth int
    Node *TreeNode
}

func minDepth(root *TreeNode) int {
    // Null node has 0 depth.
    if root == nil {
        return 0
    }

    // Initialize a list to be used a queue with the root.
    q := make([]*NodeDequeue, 0)
    q = append(q, &NodeDequeue{Node: root, Depth: 1})

    // Level order traversal algorithm:
    for len(q) > 0 {
        // Get the node at the front of the queue.
        queueItem := q[0]
        q = q[1:]

        // Retreive the data that the node had
        node := queueItem.Node
        depth := queueItem.Depth

        // If this is the first leaf node encountered,
        // return its depth and terminate the algorithm.
        if node.Left == nil && node.Right == nil {
          return depth
        }

        // If left subtree exists, add it to queue
        if node.Left != nil {
            q = append(q, &NodeDequeue{Node: node.Left , Depth: depth + 1})
        }

        // if right subtree exists, add it to queue
        if node.Right != nil {
            q = append(q, &NodeDequeue{Node: node.Right, Depth: depth + 1})
        }
    }
    return 0
}

func main() {

}
