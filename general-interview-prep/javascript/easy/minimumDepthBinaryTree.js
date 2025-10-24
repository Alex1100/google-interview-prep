// Minimum Depth of Binary Tree

// Given a binary tree, find its minimum depth.

// The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

// Note: A leaf is a node with no children.


// Input: root = [3,9,20,null,null,15,7]
/** 
        3
      /   \
    9      20
          /  \
        15     7
*/
// Output: 2

// Input: root = [2,null,3,null,4,null,5,null,6]
/** 
               2
              /
             3
            /
           4
          /
         5
        /
       6
*/
// Output: 5


// The number of nodes in the tree is in the range [0, 105].
// -1000 <= Node.val <= 1000

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
 * @return {number}
 */
var minDepth = function(root) {
  if (!root) {
      return 0;
  }
  
  let queue = [root];
  let node = root;
  let depth = 0;
  while (queue.length) {
      let queueLen = queue.length;
      depth++;
      for(var i = 0; i < queueLen; i++) {
          node = queue.shift();
          if(!node.left && !node.right) return depth;
          if(node.left) queue.push(node.left);
          if(node.right) queue.push(node.right);
      }
  }
  
  return depth;
};