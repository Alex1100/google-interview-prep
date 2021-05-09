/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 */

 const memo = [[null]];

 var allPossibleFBT = function(N) {
   if (memo[N]) return memo[N];
   
   const ans = [];
   
   if (N % 2 === 1) { // we can only construct the full binary tree if we have an odd N
     for (let i = 0; i < N; i++) {
       const j = N - 1 - i;
       for (let left of allPossibleFBT(i)) {
         for (let right of allPossibleFBT(j)) {
           const node = new TreeNode();
           node.left = cloneTree(left);
           node.right = cloneTree(right);
           ans.push(node);
         }
       }
     }
   }
  
   memo[N] = ans;
   
   return memo[N];
 };
 
 function cloneTree(node) {
   if (node == null) return null;
   
   const root = new TreeNode(node.val);
   root.left = cloneTree(node.left);
   root.right = cloneTree(node.right);
   
   return root;
 };