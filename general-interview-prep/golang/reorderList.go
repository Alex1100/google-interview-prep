package main

//
// Given a singly linked list L: L0→L1→…→Ln-1→Ln,
// reorder it to: L0→Ln→L1→Ln-1→L2→Ln-2→…
//
// You may not modify the values in the list's nodes, only nodes itself may be changed.
//
// Example 1:
//
// Given 1->2->3->4, reorder it to 1->4->2->3.
// Example 2:
//
// Given 1->2->3->4->5, reorder it to 1->5->2->4->3.


/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */

// Basically, find a middle node of the linked list.
// If there are two middle nodes, return the second middle node.
// Example: for the list 1->2->3->4->5->6, the middle element is 4.

// Once a middle node has been found, reverse the second part of the list.
// Example: convert 1->2->3->4->5->6 into 1->2->3->4 and 6->5->4.

// Now merge the two sorted lists.
// Example: merge 1->2->3->4 and 6->5->4 into 1->6->2->5->3->4.
func reorderList(head *ListNode)  {
    if head == nil || head.Next == nil {
        return
    }

    fast := head
    slow := head
    for fast != nil && fast.Next != nil {
        slow = slow.Next
        fast = fast.Next.Next
    }

    // reverse the second part of the list after finding the middle
    var prev *ListNode
    var tmp *ListNode
    curr := slow
    for curr != nil {
        tmp = curr.Next

        curr.Next = prev
        prev = curr
        curr = tmp
    }

    first := head
    second := prev
    for second.Next != nil {
        tmp = first.Next
        first.Next = second
        first = tmp

        tmp = second.Next
        second.Next = first
        second = tmp
    }
}

func main() {

}
