/**
 * Definition for a Node.
 * type Node struct {
 *     Val int
 *     Left *Node
 *     Right *Node
 *     Next *Node
 * }
 */

 func connect(root *Node) *Node {
  originalNode := root
  next := root
  for root != nil && root.Left != nil {
      next = root.Left
      
      for root != nil {
          root.Left.Next = root.Right
          if root.Next != nil {
              root.Right.Next = root.Next.Left
          }
          root = root.Next
      }
      
      root = next
  }
  
  return originalNode
}