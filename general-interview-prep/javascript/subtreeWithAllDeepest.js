// FB

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */

// Time Complexity: O(N), we visit all nodes
// Space Complexity: O(H), call stack can go as deep as height of tree which can be at most n in the case of a skewed tree

var subtreeWithAllDeepest = function(root) {
  let maxDepth = getMaxDepth(root);
  return findSubtree(root, maxDepth);
};

function findSubtree(root, maxDepth, depth = 0) {
  if (!root) return null;
  if (depth == maxDepth) { // found a deepest leave
      return root;
  }
  let leftSub = findSubtree(root.left, maxDepth, depth + 1);
  let rightSub = findSubtree(root.right, maxDepth, depth + 1);
  if (leftSub && rightSub) return root; // found the smallest subtree with deepest leaves
  if (leftSub) return leftSub; // deepest leave is in the left subtree but not in the right
  if (rightSub) return rightSub; // deepest leave is in the right subtree but not in the left
}

function getMaxDepth(root, depth = 0) {
  if (!root) return 0;
  if (!root.left && !root.right) return depth;
  return Math.max(getMaxDepth(root.left, depth + 1), getMaxDepth(root.right, depth + 1));
}

