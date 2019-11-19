/*
  Optimized solution O(n)
*/

const diameterOfBinaryTree = (root) => {
    let ans = 1;
    
    const depth = (node) => {
        if (!node) {
            return 0;
        }
        let L = depth(node.left);
        let R = depth(node.right);
        ans = Math.max(ans, L+R+1);
        return Math.max(L, R) + 1;
    };

    depth(root);
    return ans - 1;
};
