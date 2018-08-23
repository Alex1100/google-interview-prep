const inorderSuccessor = (root, p) => {
  let succ = null

  // Start from root and search for successor down the tree
  while (root) {
    if (p.val < root.val) {
        succ = root
        root = root.left
    } else {
        root = root.right
    }
  }

  return succ
};
