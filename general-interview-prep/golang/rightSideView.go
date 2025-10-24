package main

import "fmt"

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// Given the root of a binary tree, imagine yourself standing on the right side of it,
// return the values of the nodes you can see ordered from top to bottom.

// Example 1:

// Input: root = [1,2,3,null,5,null,4]
// Output: [1,3,4]

// Example 2:

// Input: root = [1,null,3]
// Output: [1,3]

// Example 3:

// Input: root = []
// Output: []

// Constraints:

// - The number of nodes in the tree is in the range [0, 100].
// - -100 <= Node.val <= 100

func rightSideView(root *TreeNode) []int {
	m := []int{}
	if root == nil {
		return m
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
	m = helper(root.Right, depth+1, m)
	m = helper(root.Left, depth+1, m)
	return m
}

func main() {
	fmt.Println(rightSideView(&TreeNode{Val: 1, Left: &TreeNode{Val: 2}}))
}
