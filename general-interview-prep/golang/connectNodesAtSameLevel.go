/**
 * Definition for a TreeNode.
 *
 * type TreeNode struct {
 *    Val int
 *    Left *TreeNode
 *    Right *TreeNode
 *    Next *TreeNode
 * };
 */


/**
 * @param {*TreeNode} root
 * @return {*TreeNode}
 */
func connect(root *TreeNode) *TreeNode {
    og := root
    for root != nil && root.Left != nil {
        next := root.Left

        for root {
            root.Left.Next = root.Right
            if root.Next != nil {
              root.Right.Next = root.Next.Left
            } else {
              root.Right.Next = root.Next
            }

            root = root.Next
        }

        root = next
    }

    return og
};
