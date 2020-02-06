/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

var distributeCoins = function(root) {
  return fn(root, null); // passing null removes need to coerce undefined
};

const fn = (root, p) => {
  let moves = 0;

  if (root.left != null) moves += fn(root.left, root);

  if (root.right != null) moves += fn(root.right, root);

  if (p != null) {
    let mod = root.val - 1;
    if (root.val < 1) { // debit parent for needed coins
      p.val -= -mod;
      moves += -mod;
      root.val = 1;
    } else if (root.val > 1) { // credit parent for excess coins
      p.val += mod;
      moves += mod;
      root.val = 1;
    }
  }

  return moves;
};
