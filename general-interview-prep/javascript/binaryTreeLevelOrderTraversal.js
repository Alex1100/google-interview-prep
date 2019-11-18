/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 * BFS traversal
 */

var levelOrder = function(root) {
    if (root === null || root && root.length === 0) {
        return [];
    }

    let current = [root];
    let stack = [];

    while(current.length) {
        let next = [];
        for (let node of current) {
            if (node) {
                if (node.left) {
                    next.push(node.left);
                }

                if (node.right) {
                    next.push(node.right);
                }
            }
        }

        stack.push(current.filter(a => a).map(a => a.val));
        current = next;
    }

    return stack;
};
