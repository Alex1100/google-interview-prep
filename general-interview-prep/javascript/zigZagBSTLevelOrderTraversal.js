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
 */
var zigzagLevelOrder = function(root) {
    let res = [];
    let layer = 0;

    function recurse(node, layer) {
        if (!node) {
            return;
        }

        if (res.length <= layer) {
            res.push([]);
        }

        if (layer % 2 === 0) {
            res[layer].push(node.val);
        } else {
            res[layer].splice(0, 0, node.val);
        }

        recurse(node.left, layer + 1);
        recurse(node.right, layer + 1);
    };

    recurse(root, layer);
    return res;
};
