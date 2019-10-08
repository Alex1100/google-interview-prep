package main

/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */

import (
    "math"
    "fmt"
)


type TreeNode struct {
   Val int
   Left *TreeNode
   Right *TreeNode
}

func dfsTraverse(node *TreeNode, count, max int) int {
    if node == nil {
        return int(math.Max(float64(max), float64(count)))
    }

    if node.Left != nil {
        if node.Left.Val - node.Val == 1 {
            max = dfsTraverse(node.Left, count + 1, max)
        } else {
            max = dfsTraverse(node.Left, 1, max)
        }
    }

    if node.Right != nil {
        if node.Right.Val - node.Val == 1 {
            max = dfsTraverse(node.Right, count + 1, max)
        } else {
            max = dfsTraverse(node.Right, 1, max)
        }
    }

    return int(math.Max(float64(max), float64(count)))
}

func longestConsecutive(root *TreeNode) int {
    if root == nil {
        return 0
    }

    max := 0
    return dfsTraverse(root, 1, max)
}


func main() {
  // TODO ADD BST
  /**
   * Definition for a binary tree node.
   * type TreeNode struct {
   *     Val int
   *     Left *TreeNode
   *     Right *TreeNode
   * }
   */
  bst := &TreeNode{
    Val: 1,
    Left: nil,
    Right: &TreeNode{
      Val: 3,
      Left: &TreeNode{
        Val: 2,
        Left: nil,
        Right: nil,
      },
      Right: &TreeNode{
        Val: 4,
        Left: nil,
        Right: &TreeNode{
          Val: 5,
          Left: nil,
          Right: nil,
        },
      },
    },
  }

  fmt.Println(longestConsecutive(bst), "\nLongest consecutive sequence path is 3-4-5.")
}
