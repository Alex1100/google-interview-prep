/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */

 func sumEvenGrandparent(root *TreeNode) int {
	runningSum := 0
	dfs(root, &runningSum)
	return runningSum
}

func dfs(root *TreeNode, runningSum *int) {
	if root == nil {
			return
	}
	if root.Val % 2 == 0 {
			if root.Left != nil && root.Left.Left != nil {
					*runningSum = *runningSum + root.Left.Left.Val
			}
			if root.Left != nil && root.Left.Right != nil {
					*runningSum = *runningSum + root.Left.Right.Val
			}
			if root.Right != nil && root.Right.Left != nil {
					*runningSum = *runningSum + root.Right.Left.Val
			}
			if root.Right != nil && root.Right.Right != nil {
					*runningSum = *runningSum + root.Right.Right.Val
			}        
	}
	dfs(root.Left, runningSum)
	dfs(root.Right, runningSum)
}