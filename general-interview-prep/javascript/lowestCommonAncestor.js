/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
  return search(root, p, q);
};

const search = (node, p, q) => {
  if (node === null) return null;
  if (node.val === p.val || node.val === q.val) return node;
  let leftSearchResult = search(node.left, p, q);
  let rightSearchResult = search(node.right, p, q);

  if (leftSearchResult === null) return rightSearchResult;
  if (rightSearchResult === null) return leftSearchResult;

  return node;
}
