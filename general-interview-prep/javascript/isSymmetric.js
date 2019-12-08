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

/*

*/
var isSymmetric = function(root) {
    const isMirror = (t1, t2) => {
        if (t1 === null && t2 === null) return true;
        if (t1 === null || t2 === null) return false;
        return t1.val === t2.val && isMirror(t1.right, t2.left) && isMirror(t1.left, t2.right);
    }
    return isMirror(root, root);
};


// ITERATIVE APPROACH

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
var isSymmetric = function(root) {
    // dfs preorder

    // then split array into left including root
    // and right without root

    // if elements are equal as we get closer to the root
    // then true
    // if they don't ever equal just short circuit and return false

    let result = [];
    let left = [];
    let right = [];
    const t = (node, result, left, right) => {
        if (node) {
            t(node.left, left, left, right);
            result.push(node.val);
            t(node.right, right, left, right);
        }
    };

    t(root, result, left, right);
    let l = 0;
    let r = right.length - 1;

    if (left.length !== right.length) {
        return false;
    }

    while(l < left.length) {
        if (left[l] !== right[r]) {
            return false;
        }

        l++;
        r--;
    }

    return true;
};
