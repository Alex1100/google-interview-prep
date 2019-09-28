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

func merge(l1, l2 *ListNode) *ListNode {
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

func sortList(head *ListNode) *ListNode {
    if head == nil || head.Next == nil {
		return head
	}

	slow, fast := head, head
	for fast.Next != nil && fast.Next.Next != nil {
		slow, fast = slow.Next, fast.Next.Next
	}

	firstTail := slow
	slow = slow.Next

    // divide the first list and the second
	firstTail.Next = nil

	first, second := sortList(head), sortList(slow)
	return merge(first, second)
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
  list := &ListNode{
    Val: 9,
    Next: &ListNode{
      Val: 1,
      Next: &ListNode{
        Val: -20,
        Next: &ListNode{
          Val: 100,
          Next: nil,
        },
      },
    },
  }
  
  fmt.Println(sortList(list).printOutList())
}
