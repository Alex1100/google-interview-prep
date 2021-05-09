// FB

/**
 * // Definition for a Node.
 * function Node(val) {
 *    this.val = val;
 *    this.left = null;
 *    this.right = null;
 *    this.parent = null;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
 var lowestCommonAncestor = function(p, q) {
  let nodeA = p;
  let nodeB = q;
  
  while (nodeA !== nodeB) {
      nodeA = nodeA === null ? q : nodeA.parent;
      nodeB = nodeB === null ? p : nodeB.parent;        
  }
  
  return nodeA;
};