/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number[]} to_delete
 * @return {TreeNode[]}
 */
 function delNodes(root, to_delete) {
  to_delete = new Set(to_delete);    
  const roots = new Set([root]);
  for (const r of roots)
      dfs(roots, to_delete, r, null);
  return Array.from(roots);
}

function dfs(roots, to_delete, root, parent) {
  if (to_delete.has(root.val)) {
      root.left && roots.add(root.left);
      root.right && roots.add(root.right);
      if (!parent) return roots.delete(root);
      parent[parent.left === root ? 'left' : 'right'] = null;
  }
  root.left && dfs(roots, to_delete, root.left, root);
  root.right && dfs(roots, to_delete, root.right, root);
}