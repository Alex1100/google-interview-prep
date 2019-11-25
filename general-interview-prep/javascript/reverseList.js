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
var reverseList = function(head) {
    if (head === null) {
        return head;
    }

    let stack = [];
    let current = head;
    while(current !== null) {
        stack.push(current.val);
        current = current.next;
    }

    let resultList = new ListNode(stack.pop());
    let result = resultList;

    while(stack.length) {
        resultList.next = new ListNode(stack.pop());
        resultList = resultList.next;
    }

    return result;
};
