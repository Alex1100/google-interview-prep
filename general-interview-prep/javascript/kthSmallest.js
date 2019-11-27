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
 * @return {number}
 */
var kthSmallest = function(root, k) {
    if (k >= 1) {
        const t = (node, result) => {
            if (node) {
                if (node.left) t(node.left, result);
                result.push(node.val);
                if (node.right) t(node.right, result);
            }
        }
        let result = [];
        t(root, result);
        k--;

        let rootIdx = result.indexOf(root.val);
        if (rootIdx === 0) {
            return result[k];
        } else {
            let left = result.slice(0, rootIdx + 1);
            let right = result.slice(rootIdx + 1);
            if (k >= left.length) {
                k -= left.length;
                return right[k];
            } else {
                return left[k];
            }
        }
    } else {
        return root.val;
    }
};
