/**
 * // Definition for a Node.
 * function Node(val,next,random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */
/**
 * @param {Node} head
 * @return {Node}
 */

var copyRandomList = function(head, nodes = new Map()) {
    if(!head) return head;
    if(nodes.has(head)) return nodes.get(head);

    const copy = new Node(head.val);
    nodes.set(head, copy);
    copy.next =  copyRandomList(head.next, nodes);
    copy.random = copyRandomList(head.random, nodes);
    return copy;
};
