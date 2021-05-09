// FB

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
 var reorderList = function(head) {
  if (head === null || head.next === null) {
    return;
  }

  let fast = head, slow = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // reverse the second part of the list after finding the middle
  let curr = slow;
  let prev = null;
  while (curr !== null) {
    let tmp = curr.next

    curr.next = prev
    prev = curr
    curr = tmp
  }

  let first = head, second = prev;
  while (second.next !== null) {
    let tmp = first.next
    first.next = second
    first = tmp

    tmp = second.next
    second.next = first
    second = tmp
  }
};