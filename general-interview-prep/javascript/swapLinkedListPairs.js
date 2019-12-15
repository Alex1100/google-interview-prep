/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
    let current = head;
    let result = current;
    if (current === null || current.next === null) {
        return head;
    }

    while(current !== null && current.next !== null) {
        let temp = current.val;
        current.val = current.next.val;
        current.next.val = temp;
        current = current.next.next || null;
    }

    return result;
};
