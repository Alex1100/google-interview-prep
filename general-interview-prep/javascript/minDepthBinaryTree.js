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