/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */

func maxSum(node *TreeNode, result int) (int, int) {
    if node == nil {
        return 0, result
    }

    leftRes, res := maxSum(node.Left, result)
    leftSum := int(math.Max(0.0, float64(leftRes)))
    rightRes, rez := maxSum(node.Right, res)
    rightSum := int(math.Max(0.0, float64(rightRes)))
    result = int(math.Max(float64(rez), float64(leftSum + node.Val + rightSum)))
    return int(math.Max(float64(leftSum), float64(rightSum))) + node.Val, result
}

func maxPathSum(root *TreeNode) int {
    result := math.MinInt64
    _, finalResult := maxSum(root, result)
    return finalResult
}
