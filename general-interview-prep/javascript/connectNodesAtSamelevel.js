/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */
/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
    let og = root;
    while(root && root.left) {
        next = root.left;

        while(root) {
            root.left.next = root.right
            root.right.next = root.next && root.next.left
            root = root.next
        }

        root = next
    }
    return og
};
