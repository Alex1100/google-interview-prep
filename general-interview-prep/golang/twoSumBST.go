/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func findTarget(root *TreeNode, k int) bool {
    seen := map[int]int{}
    result := []int{}
    result = traverse(root, result)
    for i := range result {
        if _, found := seen[result[i]]; found {
            return true
        }

        seen[k - result[i]] = i
    }

    return false
}

func traverse(node *TreeNode, result []int) []int {
    if node != nil {
        if node.Left != nil {
            result = traverse(node.Left, result)
        }

        result = append(result, node.Val)

        if node.Right != nil {
            result = traverse(node.Right, result)
        }
    }

    return result
}
