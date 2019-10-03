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

 func (l *ListNode) printOutList() []int {
   result := make([]int, 0)
   curr := l

   for curr != nil {
     result = append(result, curr.Val)
     curr = curr.Next
   }

   return result
 }


/*
  Alternative approach without O(N) Space complexity
*/

func reverseBetweenAlt(head *ListNode, m int, n int) *ListNode {
  if m == n || head == nil || head.Next == nil {
    return head
  }

  root := &ListNode{
		Val: -1,
		Next: head,
	}
	// slow := root.Next
	// fast := slow.Next
  slow, fast := head, head.Next

	for i := 0 ; i < n - 1 ; i++ {
		if i < m - 1 {
			root, slow, fast = root.Next, slow.Next, fast.Next
			continue
		}

		slow.Next = fast.Next
		fast.Next = root.Next
		root.Next = fast
		fast = slow.Next
	}

	if m == 1{
		head = root.Next
	}

	return head
}


func reverseBetween(head *ListNode, m int, n int) *ListNode {
    counter := 0
    stack := make([]int, 0)
    curr := head

    for curr != nil {
        if counter == m - 1 {
            tempHead := curr
            tempCounter := counter

            for tempCounter != n {
                stack = append(stack, tempHead.Val)
                tempHead = tempHead.Next
                tempCounter++
            }


            for len(stack) > 0 {
                popped := stack[len(stack) - 1]
                stack = stack[:len(stack) - 1]
                curr.Val = popped
                curr = curr.Next
            }
        }
        counter++

        if curr != nil {
            curr = curr.Next
        }
    }

    return head
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

  fmt.Printf("LinkedList %d reversed between the %d and %d position elements is:\n%d\n", list.printOutList(), 2, 4, reverseBetween(list, 2, 4).printOutList())
}
