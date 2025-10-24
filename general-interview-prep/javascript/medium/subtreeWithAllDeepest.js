// https://leetcode.com/problems/smallest-subtree-with-all-the-deepest-nodes/description/
// FB


/*
Given the root of a binary tree, the depth of each node is the shortest distance to the root. Return the smallest subtree such that it contains all the deepest nodes in the original tree.

A node is called the deepest if it has the largest depth possible among any node in the entire tree.

The subtree of a node is a tree consisting of that node, plus the set of all descendants of that node.
*/


// Example 1:
//
// Input: root = [3,5,1,6,2,0,8,null,null,7,4]
// Output: [2,7,4]
// Explanation: We return the node with value 2, colored in yellow in the diagram.
// The nodes coloured in blue are the deepest nodes of the tree.
// Notice that nodes 5, 3 and 2 contain the deepest nodes in the tree but node 2 
// is the smallest subtree among them, so we return it.

// Example 2:
//
// Input: root = [1]
// Output: [1]
// Explanation: The root is the deepest node in the tree.


// Example 3:
//
// Input: root = [0,1,3,null,2]
// Output: [2]
// Explanation: The deepest node in the tree is 2, the valid subtrees are the subtrees of 
// nodes 2, 1 and 0 but the subtree of node 2 is the smallest.


// Constraints:
//
// The number of nodes in the tree will be in the range [1, 500].
// 0 <= Node.val <= 500
// The values of the nodes in the tree are unique.


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

