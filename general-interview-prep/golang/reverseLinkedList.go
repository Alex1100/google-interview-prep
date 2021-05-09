package main

import "fmt"

/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func reverseList(head *ListNode) *ListNode {
	if head == nil || head.Next == nil {
		return head
	}

	stack := []int{}
	current := head

	for current != nil {
		stack = append(stack, current.Val)
		current = current.Next
	}

	reversedStack := reverseSlice(stack)

	newHead := &ListNode{
		Val:  reversedStack[0],
		Next: nil,
	}

	newNode := newHead

	for i := 1; i < len(reversedStack); i++ {
		newNode.Next = &ListNode{
			Val:  reversedStack[i],
			Next: nil,
		}
		newNode = newNode.Next
	}

	return newHead
}

func reverseSlice(arr []int) []int {
	temp := make([]int, 0)

	for i := len(arr) - 1; i >= 0; i-- {
		temp = append(temp, arr[i])
	}

	return temp
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
						Val:  5,
						Next: nil,
					},
				},
			},
		},
	}

	fmt.Println(reverseList(list).printOutList())
}
