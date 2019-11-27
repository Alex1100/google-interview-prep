const inorderSuccessor = (root, p) => {
  let succ = null

  // Start from root and search for successor down the tree
  while (root) {
    if (p.val < root.val) {
        succ = root
        root = root.left
    } else {
        root = root.right
    }
  }

  return succ
};



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
 * @return {TreeNode}
 */
var inorderSuccessor = function(root, p) {
    let result = [];
    const t = (node, result) => {
        if (node) {
            node.left && t(node.left, result);
            result.push(node);
            node.right && t(node.right, result);
        }
    }

    t(root, result);
    let idx = result.indexOf(p);

    return idx + 1 > result.length - 1 ? null : result[idx + 1];
};
