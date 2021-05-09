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

// bfs
func levelOrder(root *TreeNode) [][]int {
	result := make([][]int, 0)

	if root == nil {
		return result
	}

	queue := []*TreeNode{root}

	for len(queue) > 0 {
		next := []*TreeNode{}
		resSlice := []int{}

		for _, node := range queue {
			resSlice = append(resSlice, node.Val)
			if node.Left != nil {
				next = append(next, node.Left)
			}

			if node.Right != nil {
				next = append(next, node.Right)
			}
		}
		result = append(result, resSlice)
		queue = next
	}

	return result
}

func main() {
	root := &TreeNode{
		Val: 3,
		Left: &TreeNode{
			Val:   1,
			Left:  nil,
			Right: nil,
		},
		Right: &TreeNode{
			Val: 5,
			Left: &TreeNode{
				Val:   4,
				Left:  nil,
				Right: nil,
			},
		},
	}

	fmt.Println("LEVEL ORDER TRAVERSAL IS: ", levelOrder(root))
}
