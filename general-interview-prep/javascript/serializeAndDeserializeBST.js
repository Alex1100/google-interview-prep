/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */

// Essentially just a
// pre-order traversal solution
// which will include the null node's
// in the serialized output

function serialize(root) {
  let data = [];

  function go(node) {
    if (node == null) {
      data.push(null);
      return;
    }

    data.push(node.val);
    go(node.left);
    go(node.right);
  }

  go(root);
  return data;
}


// add nodes from
// pre-ordered input array
function deserialize(data) {
  function go() {
    if (data.length === 0) return;

    const val = data.shift();
    if (val == null) return null;

    const node = new TreeNode(val);
    node.left = go();
    node.right = go();
    return node;
  }

  return go();
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
