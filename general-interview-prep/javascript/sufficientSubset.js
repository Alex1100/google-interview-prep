/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} limit
 * @return {TreeNode}
 */

var sufficientSubset = function(root, limit) {
    if (root === null) {
        return null;
    }
    if (root.left === null && root.right === null) {
        return root.val < limit ? null : root;
    }

    root.left = sufficientSubset(root.left, limit - root.val);
    root.right = sufficientSubset(root.right, limit - root.val);
    return root.left === root.right ? null : root;
};
