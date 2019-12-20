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
    l1Stack := []int{}
    l2Stack := []int{}

    current := l1
    for current != nil {
        l1Stack = append(l1Stack, current.Val)
        current = current.Next
    }

    current = l2
    for current != nil {
        l2Stack = append(l2Stack, current.Val)
        current = current.Next
    }

    carryOver := 0
    maxLength := int(math.Max(float64(len(l1Stack)), float64(len(l2Stack))))
    res := &ListNode{
        Val: 0,
        Next: nil,
    }

    result := res

    for i := 0; i < maxLength; i++ {
        aVal, bVal := 0, 0
        if len(l1Stack) > i {
            aVal = l1Stack[i]
        }

        if len(l2Stack) > i {
            bVal = l2Stack[i]
        }

        calc := carryOver + aVal + bVal
        carryOver = 0

        if calc > 9 {
            calc -= 10
            carryOver++
        }

        res.Val = calc

        if i < maxLength - 1 {
            res.Next = &ListNode{
                Val: 0,
                Next: nil,
            }
            res = res.Next
        }
    }

    if carryOver == 1 {
        res.Next = &ListNode{
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
