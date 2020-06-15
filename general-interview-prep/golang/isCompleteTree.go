package main

import "fmt"
type TreeNode struct {
     Val int
     Left *TreeNode
     Right *TreeNode
 }

/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */

func isCompleteTree(root *TreeNode) bool {
    if root == nil {
        return true
    }

    gap := false
    queue := []*TreeNode{root}

    for len(queue) > 0 {
        next := []*TreeNode{}

        for _, current := range queue {
            if current.Left != nil && gap == true {
                return false
            }

            if current.Left != nil {
                next = append(next, current.Left)
            } else {
                gap = true
            }

            if current.Right != nil && gap == true {
                return false
            }

            if current.Right != nil {
                next = append(next, current.Right)
            } else {
                gap = true
            }
        }

        queue = next
    }

    return true
}


func main() {
  fmt.Println(isCompleteTree(&TreeNode{Val: 1, Left: &TreeNode{Val: 2, Left: &TreeNode{Val: 4}, Right: &TreeNode{Val: 5}}, Right: &TreeNode{Val: 3, Left: &TreeNode{Val: 6}}}))
}
