/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
const isValidBST = (root, min = -Infinity, max = Infinity) => {
    if (root === null) {
        return true;
    }

    // false if this node violates min/max constraint
    if (root.val < min || root.val > max) {
        return false;
    }

    // Otherwise check the subtrees recursively
    // tightening the min or max constraint
    return (isValidBST(root.left, min, root.val -1) && isValidBST(root.right, root.val+1, max))
};
