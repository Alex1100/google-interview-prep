/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func averageOfLevels(root *TreeNode) []float64 {
    result := []float64{}
    if root == nil {
        return result
    }

    q := []*TreeNode{root}

    for len(q) != 0 {
        next := []*TreeNode{}
        sum := 0
        count := 0

        for _, edge := range q {
            sum += edge.Val
            count++
            if edge.Left != nil {
                next = append(next, edge.Left)
            }

            if edge.Right != nil {
                next = append(next, edge.Right)
            }
        }

        result = append(result, float64(sum) / float64(count))
        q = next
    }

    return result
}
