package main

import "fmt"

type TreeNode struct {
  Val int
  Left *TreeNode
  Right *TreeNode
}


var m []int
func rightSideView(root *TreeNode) []int {
    m := []int{}
    if root == nil {
        return nil
    }
    return helper(root, 0, m)
}
func helper(root *TreeNode, depth int, m []int) []int {
    if root == nil {
        return m
    }
    if len(m) <= depth {
        m = append(m, root.Val)
    }
    m = helper(root.Right, depth + 1, m)
    m = helper(root.Left, depth + 1, m)
    return m
}


func main() {
  fmt.Println(rightSideView(&TreeNode{Val: 1, Left: &TreeNode{Val: 2}}))
}
