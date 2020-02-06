/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {boolean}
 */
var findTarget = function(root, k) {
    let seen = {};
    let tracker = {};

    const t = (node, seen) => {
        if (node && !seen[node.val]) {
            node.left && t(node.left, seen);
            seen[node.val] = node.val;
            node.right && t(node.right, seen);
        }
    }

    t(root, seen);
    let nums = Object.keys(seen);

    for (let i = 0; i < nums.length; i++) {
        if (tracker[nums[i]] !== undefined) {
            return true;
        }

        if (tracker[k - nums[i]] === undefined) {
            tracker[k - nums[i]] = i;
        }
    }

    return false;
};
