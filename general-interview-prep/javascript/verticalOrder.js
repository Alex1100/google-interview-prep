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
 * @return {number[][]}
 */
 var verticalOrder = function(root) {
  if (!root) return [];
  
  root.offset = 0;
  const queue = [root];
  
  const res = [];
  let rootLevel = 0;
  
  while (queue.length) {
      let node = queue.shift();
      
      if (res[rootLevel + node.offset]) {
          res[rootLevel + node.offset].push(node.val);
      } else if (node.offset < 0) {
          res.unshift([node.val]);
          rootLevel++;
      } else {
          res.push([node.val]);
      }
      
      if (node.left) {
          node.left.offset = node.offset - 1;
          queue.push(node.left);
      }
      if (node.right) {
          node.right.offset = node.offset + 1;
          queue.push(node.right);
      }
  }
  
  return res;
};