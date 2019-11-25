/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var boundaryOfBinaryTree = function(root) {
    if(!root || root == null) return [];
    if(!root.left && !root.right) return [root.val];

    let resL = [],
        resR = [],
        res = [];

    //DFS push all the nodes on the left side except root and the leaves
    function boundaryL(root){
        if(!root) return;
        if(root.left){
            resL.push(root.val);
            boundaryL(root.left);
        }
        else if(root.right){
            resL.push(root.val);
            boundaryL(root.right);
        }

    }

	//check the leaves.  if without any left and right nodes, push to res
    function leaf(root){
        if(!root) return;
        leaf(root.left);
        if(!root.left && !root.right){
            res.push(root.val);
        }
        leaf(root.right);
    }

     //DFS push all the nodes on the right side except root and the leaves.
    function boundaryR(root){
        if(!root) return;
        if(root.right){
            boundaryR(root.right); // do the recursion first to get the root.val bottom up
            resR.push(root.val);
        }
        else if(root.left){
            boundaryR(root.left);
            resR.push(root.val);
        }
    }

    boundaryL(root.left);
    leaf(root.left);
    leaf(root.right);
    boundaryR(root.right);
    return [root.val,...resL,...res,...resR];

};




/*
 *
 * Even Easier implementation with recursion
 *
 */
 function buildSide(root, side, res) {
     if (!root) return;
     if (root.left || root.right) res.push(root.val);
     if (root[side]) buildSide(root[side], side, res);
     else buildSide(root[side === 'left' ? 'right' : 'left'], side, res);
 }

 function buildBottom(root, res) {
     if (!root) return;
     if (!root.left && !root.right) res.push(root.val);
     buildBottom(root.left, res);
     buildBottom(root.right, res);
 }

 const simpleBoundaryOfBinaryTree = function(root) {
     if (!root) return [];
     if (!root.left && !root.right) return [root.val];
     const res = [root.val];
     buildSide(root.left, 'left', res);
     buildBottom(root, res);
     const right = [];
     buildSide(root.right, 'right', right);
     return [...res, ...right.reverse()];
 };
