/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
 var deleteDuplicates = function(head) {
  let slow = head;
  let fast = head;
  let current = slow;
  
  while (current && current.next !== null) {
      while (fast && fast.val === current.val) {
          fast = fast.next
      }
      current.next = fast;
      current = current.next;
      fast = current;
  }
  
  return slow;
};