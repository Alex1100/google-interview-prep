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
 * @return {boolean}
 */


 var isCompleteTree = function(root) {
  let arr = [];
  if (!root) {
      return false;
  }
  
  let gap = false;
  let queue = [root];
  
  while (queue.length) {
      let next = [];
      for (let i = 0; i < queue.length; i++) {
          let current = queue[i];
          if (current.left !== null && gap ) {
              return false;
          }
          
          if (current.left) {
              next.push(current.left);
          } else {
              gap = true;
          }
          
          if (current.right !== null && gap) {
              return false;
          }
          
          if (current.right) {
              next.push(current.right);
          } else {
              gap = true;
          }
      }
      
      queue = next;
  }
  
  return true
};