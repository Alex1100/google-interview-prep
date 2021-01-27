/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */

 func inOrderTraversal(node *TreeNode, arr []int) []int {
	if node != nil {
			arr = append(arr, node.Val)
			
			if node.Left != nil {
					arr = inOrderTraversal(node.Left, arr)
			}
			
			if node.Right != nil {
					arr = inOrderTraversal(node.Right, arr)
			}
	}
	
	return arr
}

type Index struct {
	Val int
}


func findTarget(root *TreeNode, k int) bool {
	arr := make([]int, 0)
	
	arr = inOrderTraversal(root, arr)
	seen := make(map[int]*Index)
	
	for i := 0; i < len(arr); i++ {
		sumPartner := k - arr[i]

		if seen[sumPartner] != nil {
			return true
		} else {
			seen[arr[i]] = &Index{Val: i}
		}
	}
	
	return false
}