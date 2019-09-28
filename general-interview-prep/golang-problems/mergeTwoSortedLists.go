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

func mergeTwoLists(l1 *ListNode, l2 *ListNode) *ListNode {
    if l1 == nil {
        return l2
    } else if l2 == nil {
        return l1
    } else if l2 == nil && l1 == nil {
        return nil
    }

    var resultList *ListNode

    if l1.Val <= l2.Val {
        resultList = l1
        l1 = l1.Next
    } else {
        resultList = l2
        l2 = l2.Next
    }

    curr := resultList

    for l1 != nil && l2 != nil {
        if l1.Val <= l2.Val {
            curr.Next = l1
            l1 = l1.Next
            curr = curr.Next
        } else {
            curr.Next = l2
            l2 = l2.Next
            curr = curr.Next
        }
    }

    if l1 != nil {
        curr.Next = l1
    } else if l2 != nil {
        curr.Next = l2
    }

    return resultList
}

func (li *ListNode) printOutList() []int {
  curr := li
  resultArr := make([]int, 0)
  for curr != nil {
      resultArr = append(resultArr, curr.Val)
      curr = curr.Next
  }

  return resultArr
}

func main() {

  l1 := &ListNode{
    Val: 2,
    Next: &ListNode{
      Val: 3,
      Next: &ListNode{
        Val: 11,
        Next: nil,
      },
    },
  }

  l2 := &ListNode{
    Val: 5,
    Next: &ListNode{
      Val: 6,
      Next: &ListNode{
        Val: 7,
        Next: nil,
      },
    },
  }

  fmt.Println("MERGED LISTS ARE ", mergeTwoLists(l1, l2).printOutList())
}
