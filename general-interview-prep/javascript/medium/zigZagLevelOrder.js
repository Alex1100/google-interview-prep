// Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. 
// (i.e., from left to right, then right to left for the next level and alternate between).


// Example 1:
// Input: root = [3,9,20,null,null,15,7]
// Output: [[3],[20,9],[15,7]]

// Example 2:
// Input: root = [1]
// Output: [[1]]

// Example 3:
// Input: root = []
// Output: []

// Constraints:
// The number of nodes in the tree is in the range [0, 2000].
// -100 <= Node.val <= 100

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
