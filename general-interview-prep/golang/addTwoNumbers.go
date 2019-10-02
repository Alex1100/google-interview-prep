package main

import (
  "fmt"
)

type ListNode struct {
  Val int
  Next *ListNode
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

/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */

func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
    carryOver := 0
    currentVal := 0
    a := l1
    b := l2

    current := &ListNode{
        Val: 0,
        Next: nil,
    }

    result := current
    keepIterating := true

    for keepIterating {
        aVal := 0
        bVal := 0

        if a != nil {
            aVal = a.Val
        }

        if b != nil {
            bVal = b.Val
        }

        currentVal = carryOver + aVal + bVal
        carryOver = 0

        if currentVal >= 10 {
            currentVal = currentVal - 10
            carryOver++
        }

        current.Val = currentVal
        if a != nil {
            a = a.Next
        } else {
            a = nil
        }
        if b != nil {
            b = b.Next
        } else {
            b = nil
        }
        if a == nil && b == nil {
            keepIterating = false
        } else {
            current.Next = &ListNode{
                Val: 0,
                Next: nil,
            }
            current = current.Next
        }
    }

    curr := result
    if carryOver > 0 {

        for curr.Next != nil {
            curr = curr.Next
        }

        curr.Next = &ListNode{
            Val: carryOver,
            Next: nil,
        }
    }

    return result
}


func main() {
  l1 := &ListNode{
    Val: 2,
    Next: &ListNode{
      Val: 4,
      Next: &ListNode{
        Val: 3,
        Next: nil,
      },
    },
  }

  l2 := &ListNode{
    Val: 5,
    Next: &ListNode{
      Val: 6,
      Next: &ListNode{
        Val: 4,
        Next: nil,
      },
    },
  }

  resultList := addTwoNumbers(l1, l2)

  fmt.Printf("%d\n", resultList.printOutList())
}
