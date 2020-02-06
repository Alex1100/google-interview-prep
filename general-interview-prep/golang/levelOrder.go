package main

import "fmt"

type TreeNode struct {
  Val int
  Left *TreeNode
  Right *TreeNode
}

func levelOrder(root *TreeNode) [][]int {
    res := make([][]int, 0)

    if root == nil {
        return res
    }

    q := make([]*TreeNode, 0)
    q = append(q, root)
    level := 0

    for len(q) != 0 {
        next := make([]*TreeNode, 0)
        additonalLayer := make([]int, 0)
        res = append(res, additonalLayer)

        for i := 0; i < len(q); i++ {
            current := q[i]
            res[level] = append(res[level], current.Val)

            if current.Left != nil {
                next = append(next, current.Left)
            }

            if current.Right != nil {
                next = append(next, current.Right)
            }

        }
        level++
        q = next
    }

    return res
}


func main() {
  root := &TreeNode{
    Val: 3,
    Left: &TreeNode{
      Val: 1,
      Left: nil,
      Right: nil,
    },
    Right: &TreeNode{
      Val: 5,
      Left: &TreeNode{
        Val: 4,
        Left: nil,
        Right: nil,
      },
    },
  }

  fmt.Println("LEVEL ORDER TRAVERSAL IS: ", levelOrder(root))
}
