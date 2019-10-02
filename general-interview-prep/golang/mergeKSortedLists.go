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

// Divide And Conquer
func mergeKLists(lists []*ListNode) *ListNode {
    if len(lists) == 0 {
        return nil
    }

    k := len(lists)
    if k == 1 {
        return lists[0]
    }

    l1 := mergeKLists(lists[:k/2])
    l2 := mergeKLists(lists[k/2:])
    return mergeTwoLists(l1, l2)
}

func mergeTwoLists(l1, l2 *ListNode) *ListNode {
    var dummyHead ListNode

    cur := &dummyHead
    for l1 != nil && l2 != nil {
        if l1.Val < l2.Val {
            cur.Next = l1
            l1 = l1.Next
        } else {
            cur.Next = l2
            l2 = l2.Next
        }
        cur = cur.Next
    }

    if l1 != nil {
        cur.Next = l1
    } else if l2 != nil {
        cur.Next = l2
    }

    return dummyHead.Next
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

  l3 := &ListNode{
    Val: 1,
    Next: &ListNode{
      Val: 8,
      Next: &ListNode{
        Val: 9,
        Next: nil,
      },
    },
  }

  var lists []*ListNode
  lists = []*ListNode{l1, l2, l3}
  fmt.Println("MERGED AND SORTED LISTS ARE: ", mergeKLists(lists).printOutList())
}
