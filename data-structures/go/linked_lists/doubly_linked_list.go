package linked_lists
//
// // add struct that holds structure
// // so pointers to head and tail are
// // not included on each node
//
// type DoublyIntListNode struct {
//   Val int
//   Head *DoublyIntListNode
//   Next *DoublyIntListNode
//   Prev *DoublyIntListNode
//   Tail *DoublyIntListNode
// }
//
// type DoublyStringListNode struct {
//   Val string
//   Head *DoublyStringListNode
//   Next *DoublyStringListNode
//   Prev *DoublyStringListNode
//   Tail *DoublyStringListNode
// }
//
// type DoublyInterfaceListNode struct {
//   Val interface{}
//   Head *DoublyInterfaceListNode
//   Next *DoublyInterfaceListNode
//   Prev *DoublyInterfaceListNode
//   Tail *DoublyInterfaceListNode
// }
//
// func (ln *DoublyIntListNode) AppendInt(node int) {
//   if ln == nil {
//     ln = &DoublyIntListNode{
//       Val: node,
//       Head: nil,
//       Next: nil,
//       Prev: nil,
//       Tail: nil,
//     }
//     ln.Head = ln
//     ln.Tail = ln
//   } else {
//     var prev *DoublyIntListNode
//     head := ln.Head
//     tail := ln.Tail
//     curr := ln
//
//     for curr.Next != nil {
//       prev = curr
//       curr = curr.Next
//       curr.Head = head
//       curr.Prev = prev
//       curr.Tail = tail
//     }
//
//     prev = curr
//
//     curr.Next = &DoublyIntListNode{
//       Val: node,
//       Head: head,
//       Next: nil,
//       Prev: prev,
//       Tail: nil,
//     }
//
//     curr.Next.Tail = curr.Next
//   }
// }
//
// func (ln *DoublyStringListNode) AppendString(node string) {
//   if ln == nil {
//     ln = &DoublyStringListNode{
//       Val: node,
//       Head: nil,
//       Next: nil,
//       Prev: nil,
//       Tail: nil,
//     }
//     ln.Head = ln
//     ln.Tail = ln
//   } else {
//     var prev *DoublyStringListNode
//     head := ln.Head
//     tail := ln.Tail
//     curr := ln
//
//     for curr.Next != nil {
//       prev = curr
//       curr = curr.Next
//       curr.Head = head
//       curr.Prev = prev
//       curr.Tail = tail
//     }
//
//     prev = curr
//
//     curr.Next = &DoublyStringListNode{
//       Val: node,
//       Head: head,
//       Next: nil,
//       Prev: prev,
//       Tail: nil,
//     }
//
//     curr.Next.Tail = curr.Next
//   }
// }
//
// func (ln *DoublyInterfaceListNode) Append(node interface{}) {
//   if ln == nil {
//     ln = &DoublyInterfaceListNode{
//       Val: node,
//       Head: nil,
//       Next: nil,
//       Prev: nil,
//       Tail: nil,
//     }
//     ln.Head = ln
//     ln.Tail = ln
//   } else {
//     var prev *DoublyInterfaceListNode
//     head := ln.Head
//     tail := ln.Tail
//     curr := ln
//
//     for curr.Next != nil {
//       prev = curr
//       curr = curr.Next
//       curr.Head = head
//       curr.Prev = prev
//       curr.Tail = tail
//     }
//
//     prev = curr
//
//     curr.Next = &DoublyInterfaceListNode{
//       Val: node,
//       Head: head,
//       Next: nil,
//       Prev: prev,
//       Tail: nil,
//     }
//
//     curr.Next.Tail = curr.Next
//   }
// }
//
//
// // fix deletion so it doesn't
// func (ln *DoublyIntListNode) DeleteInt(node int) (int, *DoublyIntListNode) {
//   if ln == nil {
//     return -1, ln
//   }
//
//   curr := ln
//   head := curr
//   toDelete := curr
//   prev := curr
//
//   if curr.Val == node {
//     toDelete = curr
//     curr = curr.Next
//     curr.Prev = nil
//     return toDelete.Val, ln.Next
//   }
//
//   for curr.Next != nil {
//     prev = curr.Prev
//     if curr.Val == node {
//       toDelete = curr
//       prev.Next = curr.Next
//       curr = curr.Next
//       curr.Prev = prev
//     } else {
//       curr = curr.Next
//     }
//   }
//
//   if node == curr.Val {
//     toDelete = curr
//     temp := curr.Prev
//     temp.Tail
//     curr.Prev.Next = nil
//     curr.Prev.Prev.Next = temp
//
//   }
//
//   return toDelete.Val, head
// }
//
// func (ln *DoublyStringListNode) DeleteString(node string) (string, *DoublyStringListNode) {
//   if ln == nil {
//     return "", ln
//   }
//
//   curr := ln
//   head := curr
//   toDelete := curr
//   prev := curr
//
//   if curr.Val == node {
//     toDelete = curr
//     curr = curr.Next
//     curr.Prev = nil
//     return toDelete.Val, ln.Next
//   }
//
//   for curr.Next != nil {
//     prev = curr.Prev
//     if curr.Val == node {
//       toDelete = curr
//       prev.Next = curr.Next
//       curr = curr.Next
//       curr.Prev = prev
//     } else {
//       curr = curr.Next
//     }
//   }
//
//   if node == curr.Val {
//     toDelete = curr
//     temp := curr.Prev
//     curr.Prev.Next = nil
//     curr.Prev.Prev.Next = temp
//   }
//
//   return toDelete.Val, head
// }
//
// func (ln *DoublyInterfaceListNode) Delete(node interface{}) (interface{}, *DoublyInterfaceListNode) {
//   if ln == nil {
//     return nil, ln
//   }
//
//   curr := ln
//   head := curr
//   toDelete := curr
//   prev := curr
//
//   if curr.Val == node {
//     toDelete = curr
//     curr = curr.Next
//     curr.Prev = nil
//     return toDelete.Val, ln.Next
//   }
//
//   for curr != nil {
//     prev = curr.Prev
//     if curr.Val == node {
//       toDelete = curr
//       prev.Next = curr.Next
//       curr = curr.Next
//       curr.Prev = prev
//     } else {
//       curr = curr.Next
//     }
//   }
//
//   if node == curr.Val {
//     toDelete = curr
//     temp := curr.Prev
//     curr.Prev.Next = nil
//     curr.Prev.Prev.Next = temp
//   }
//
//   return toDelete.Val, head
// }
//
//
// // contains with a doubly node should be
// // O(log n) time since we could go from left and right ends
// func (ln *DoublyIntListNode) ContainsInt(node int) bool {
//   if ln == nil {
//     return false
//   }
//
//   curr := ln
//   contained := false
//
//   for curr != nil {
//     if curr.Val == node {
//       contained = true
//       return contained
//     } else {
//       curr = curr.Next
//     }
//   }
//
//   return contained
// }
//
// func (ln *DoublyStringListNode) ContainsString(node string) bool {
//   if ln == nil {
//     return false
//   }
//
//   curr := ln
//   contained := false
//
//   for curr != nil {
//     if curr.Val == node {
//       contained = true
//       return contained
//     } else {
//       curr = curr.Next
//     }
//   }
//
//   return contained
// }
//
// func (ln *DoublyInterfaceListNode) Contains(node interface{}) bool {
//   if ln == nil {
//     return false
//   }
//
//   curr := ln
//   contained := false
//
//   for curr != nil {
//     if curr.Val == node {
//       contained = true
//       return contained
//     } else {
//       curr = curr.Next
//     }
//   }
//
//   return contained
// }
