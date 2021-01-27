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
	"fmt"
	"strconv"
)

func getPathFromRoot(root *TreeNode, str string, hash map[string]string) {
	currStr := str

	if root.Right != nil {
		rightStr := strconv.Itoa(root.Right.Val)
		// if root.Left == nil {
		hash[currStr+rightStr] = currStr + rightStr
		// }
		getPathFromRoot(root.Right, currStr+rightStr, hash)
	}

	if root.Left != nil {
		leftStr := strconv.Itoa(root.Left.Val)
		// if root.Right == nil {
		hash[currStr+leftStr] = currStr + leftStr
		// }
		getPathFromRoot(root.Left, currStr+leftStr, hash)
	}

	if root.Left == nil && root.Right == nil {
		hash[currStr] = currStr
	}
}

func sumRootToLeaf(root *TreeNode) int {
	if root.Left == nil && root.Right == nil {
		return root.Val
	}

	hash := map[string]string{}
	a := strconv.Itoa(root.Val)

	getPathFromRoot(root, a, hash)
	fmt.Println("HASH IS: ", hash)

	sum := int64(0)
	for _, val := range hash {
		i, _ := strconv.ParseInt(val, 2, 64)
		fmt.Println("i is: ", i)
		sum += i
	}
	return int(sum)
}

func main() {
	fmt.Println(getPathFromRoot)
}
