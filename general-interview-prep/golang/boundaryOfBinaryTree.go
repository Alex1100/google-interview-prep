/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */

func buildBottom(node *TreeNode, stack []int) []int {
    if node == nil {return stack}
    if node.Left == nil && node.Right == nil {
        stack = append(stack, node.Val)
    }

    stack = buildBottom(node.Left, stack)
    stack = buildBottom(node.Right, stack)
    return stack
}

func buildSide(node *TreeNode, side string, stack []int) []int {
    if node == nil {return stack}
    if node.Left != nil || node.Right != nil {
        stack = append(stack, node.Val)
    }
    if side == "left" {
        if node.Left != nil {
            stack = buildSide(node.Left, "left", stack)
        } else {
            stack = buildSide(node.Right, "left", stack)
        }
    } else {
        if node.Right != nil {
            stack = buildSide(node.Right, "right", stack)
        } else {
            stack = buildSide(node.Left, "right", stack)
        }
    }

    return stack
}

func reverseSlice(arr []int) []int {
    temp := []int{}

    for len(arr) != 0 {
        temp = append(temp, arr[len(arr) - 1])
        arr = arr[:len(arr) - 1]
    }

    return temp
}

func boundaryOfBinaryTree(root *TreeNode) []int {
    if root == nil {return []int{}}
    if root.Left == nil && root.Right == nil {
        return []int{root.Val}
    }

    res := []int{root.Val}
    res = buildSide(root.Left, "left", res)
    res = buildBottom(root, res)

    right := []int{}
    right = buildSide(root.Right, "right", right)

    result := []int{}
    result = append(result, res...)
    result = append(result, reverseSlice(right)...)
    return result

}
