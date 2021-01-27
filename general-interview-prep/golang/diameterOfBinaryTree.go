package main

import "fmt"

/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */

type TreeNode struct {
  Val int
  Left *TreeNode
  Right *TreeNode
}

var maxCount = 1.0
var leftCount = 0.0
var rightCount = 0.0

var tree = &TreeNode{
  Val: 1,
  Left: &TreeNode{
    Val: 2,
  },
  Right: &TreeNode{
    Val: 3,
  },
}

func diameterOfBinaryTree(root *TreeNode) int {
    // dfs will go through until a nil node
    // has been reached and then backtrack off the callstack
    // until it has it's max for both left and right
    // finally we check to see the max and if its greater than left + right + 1 for current
    // and then we return max of left or right + 1 to have something to
    // read when we backtrack off the callstack
    maxCount = 1.0
    leftCount = 0.0
    rightCount = 0.0
    traverse(root)
    return int(maxCount) - 1
}

func traverse(node *TreeNode) float64 {
    if node == nil {
        return 0.0
    }

    left := traverse(node.Left)
    right := traverse(node.Right)
    maxCount = math.Max(maxCount, left + right + 1.0)
    return math.Max(left, right) + 1.0
}

func main() {
  fmt.Println(diameterOfBinaryTree(tree))
}
