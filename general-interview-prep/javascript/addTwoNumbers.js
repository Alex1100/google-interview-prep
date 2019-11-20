/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let dup = new ListNode(0);
    let temp = dup;
    let l1Stack = [];
    let l2Stack = [];
    let current = l1;

    while(current !== null) {
        l1Stack.push(current.val);
        current = current.next;
    }

    current = l2;
    while(current !== null) {
        l2Stack.push(current.val);
        current = current.next;
    }

    let carryOver = 0;
    let maxLen = Math.max(l1Stack.length, l2Stack.length);

    for (let i = 0; i < maxLen; i++) {
        let a = l1Stack[i] ? l1Stack[i] : 0;
        let b = l2Stack[i] ? l2Stack[i] : 0;

        let calc = a + b + carryOver;
        carryOver = 0
        if (calc >= 10) {
            calc = calc - 10
            carryOver++
        }

        dup.val = calc;
        if (i === maxLen - 1) {
            if (carryOver) {
                dup.next = new ListNode(carryOver);
            }
        } else {
            dup.next = new ListNode(0);
            dup = dup.next;
        }
    }

    return temp;
};
