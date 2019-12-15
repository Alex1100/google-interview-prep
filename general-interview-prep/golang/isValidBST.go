package main

import "fmt"

type TreeNode struct {
   Val int
   Left *TreeNode
   Right *TreeNode
}

func isValidBST(root *TreeNode) bool {
    if root == nil {
        return true
    }

    min := math.MinInt64
    max := math.MaxInt64

    return recurse(root.Left, min, root.Val - 1) && recurse(root.Right, root.Val + 1, max)
}

func recurse(root *TreeNode, min, max int) bool {
    if root == nil {
        return true
    }
    if root.Val < min || root.Val > max {
        return false
    }

    return recurse(root.Left, min, root.Val - 1) && recurse(root.Right, root.Val + 1, max)
}


func main() {

}
