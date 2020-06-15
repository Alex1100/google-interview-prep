package main

/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */

 func dfs(node *TreeNode, count int) int {
     if node != nil {
         if node.Left != nil {
             count = dfs(node.Left, count)
         }

         count++

         if node.Right != nil {
             count = dfs(node.Right, count)
         }
     }

     return count
 }

 func countNodesDFS(root *TreeNode) int {
     if root == nil {
         return 0
     }
     count := 0

     return dfs(root, count)
 }



// do a bfs and count number of nodes
func countNodes(root *TreeNode) int {
    if root == nil {
        return 0
    }

    queue := []*TreeNode{root}
    count := 1
    for len(queue) > 0 {
        next := []*TreeNode{}
        for _, node := range queue {
            if node.Left != nil {
                next = append(next, node.Left)
                count++
            }

            if node.Right != nil {
                next = append(next, node.Right)
                count++
            }
        }

        queue = next
    }

    return count
}
