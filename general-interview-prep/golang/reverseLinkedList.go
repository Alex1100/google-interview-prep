package main

import "fmt"

/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */

 type ListNode struct {
   Val int
   Next *ListNode
 }

func reverseList(head *ListNode) *ListNode {
  if head == nil {
    return nil
  }

  stack := make([]int, 0)
  curr := head
  var resultList *ListNode

  for curr != nil {
    stack = append(stack, curr.Val)
    curr = curr.Next
  }

  resultList = &ListNode{
    Val: stack[len(stack) - 1],
    Next: nil,
  }

  result := resultList

  stack = stack[:len(stack) - 1]
  for len(stack) > 0 {
    resultList.Next = &ListNode{
      Val: stack[len(stack) - 1],
      Next: nil,
    }
    stack = stack[:len(stack) - 1]
    resultList = resultList.Next
  }

  return result
}

func (l *ListNode) printOutList() []int {
  head := l
  result := make([]int, 0)

  for head != nil {
    result = append(result, head.Val)
    head = head.Next
  }

  return result
}


func main() {
  list := &ListNode{
    Val: 1,
    Next: &ListNode{
      Val: 2,
      Next: &ListNode{
        Val: 3,
        Next: &ListNode{
          Val: 4,
          Next: &ListNode{
            Val: 5,
            Next: nil,
          },
        },
      },
    },
  }

  fmt.Println(reverseList(list).printOutList())
}
