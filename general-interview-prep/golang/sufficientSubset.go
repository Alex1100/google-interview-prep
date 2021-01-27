/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
 func sufficientSubset(root *TreeNode, limit int) *TreeNode {
	if root == nil {
			return nil
	}
	
	if root.Left == nil && root.Right == nil {
			if root.Val < limit {
					return nil
			} else {
					return root
			}
	}
	
	root.Left = sufficientSubset(root.Left, limit - root.Val)
	root.Right = sufficientSubset(root.Right, limit - root.Val)
	
	if root.Left == root.Right {
			return nil
	}
	
	return root
}