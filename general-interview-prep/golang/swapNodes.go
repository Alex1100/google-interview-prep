/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */

 func swapNodes(head *ListNode, k int) *ListNode {
	listLength, frontNode, endNode, currentNode := 0, &ListNode{}, &ListNode{}, head
	// set the front and end node in a single pass
	for currentNode != nil {
			listLength++
			if endNode != nil {
					endNode = endNode.Next
			}
			
			// check if we have reached kth node
			if listLength == k {
					frontNode = currentNode
					endNode = head
			}
			
			currentNode = currentNode.Next
	}
	
	// swap the values of front and end nodes
	temp := frontNode.Val
	frontNode.Val = endNode.Val
	endNode.Val = temp
	return head
}