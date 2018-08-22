class Queue {
  constructor() {
    this.items = [];
    this.size = 0;
  }

  enqueue(item) {
    this.items.push(item);
    this.size++;
  }

  dequeue(item) {
    this.size--;
    return this.items.shift();
  }

  contains(node) {
    return this.items.includes(node);
  }

  front() {
    return this.items[0];
  }

  back() {
    return this.items[this.items.length - 1];
  }

  printQueue() {
    return this.items;
  }

  queueSize() {
    return this.size;
  }

  max() {
    return Math.max(...this.items);
  }

  min() {
    return Math.min(...this.items);
  }

  isEmpty() {
    return this.size === 0;
  }
}


class BinarySearchTree {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.parent = this;
    this.size = 0;
    this.reversed = false;
  }

  addNode(data, root = this) {
    if (data < this.data) {
      if (!this.left) {
        this.left = new BinarySearchTree(data);
        this.left.parent = this;
      } else {
        this.left.addNode(data)
      }
    } else if (data > this.data) {
      if (!this.right) {
        this.right = new BinarySearchTree(data);
        this.right.parent = this;
      } else {
        this.right.addNode(data);
      }
    } else {
      throw Error('Node Already Exists');
      this.size--;
    }
    this.size++;
  }

  search(input) {
    if (input === this.data) {
      return this;
    }

    let result = null;

    const traverse = function(node) {
      if (input === node.data) {
        result = node;
      } else {
        node.left && traverse(node.left);
        node.right && traverse(node.right);
      }
    }

    traverse(this);
    return result;
  }



  contains(input) {
    return !!this.search(input)
  };

  deleteNode(node) {
    let searchedResult = this.search(node);

    if (!searchedResult) {
      return null;
    } else {
      let parent = searchedResult.parent;
      let counter = 0;

      if (this.size === 1) {
        this.parent = null;
        this.data = null;
        this.left = null;
        this.right = null;
        this.size = 0;
        return searchedResult;
      } else if (!searchedResult.left && !searchedResult.right) {
        if (searchedResult.data < parent.data) {
          parent.left = null;
        } else {
          parent.right = null;
        }
      } else if (!searchedResult.left && searchedResult.right) {
        if (searchedResult.data < parent.data) {
          parent.left = searchedResult.right;
        } else {
          parent.right = searchedResult.right;
        }
      } else if (searchedResult.left && !searchedResult.right) {
        if (searchedResult.data < parent.data) {
          parent.left = searchedResult.left;
        } else {
          parent.right = searchedResult.left;
        }
      } else {
        let largestValue = searchedResult.left;

        while(largestValue.right) {
          largestValue = largestValue.right;
        }

        let largestValuesParent = largestValue.parent.right = 0;
        searchedResult.data = largestValue.data;
      }
    }
    this.size--;
    return true;
  }

  findMin() {
    if (this.reversed) {
      let rightLeaf = this.right;

      if (rightLeaf) {
        while(rightLeaf.right !== null) {
          rightLeaf = rightLeaf.right;
        }
        return rightLeaf;
      } else {
        return rightLeaf;
      }
    } else {
      let leftLeaf = this.left;
      if (leftLeaf) {
        while(leftLeaf.left !== null) {
          leftLeaf = leftLeaf.left;
        }
        return leftLeaf;
      } else {
        return leftLeaf;
      }
    }
  }

  findMax() {
    if (!this.reversed) {
      let rightLeaf = this.right;

      if (rightLeaf) {
        while(rightLeaf.right !== null) {
          rightLeaf = rightLeaf.right;
        }
        return rightLeaf;
      } else {
        return rightLeaf;
      }
    } else {
      let leftLeaf = this.left;
      if (leftLeaf) {
        while(leftLeaf.left !== null) {
          leftLeaf = leftLeaf.left;
        }
        return leftLeaf;
      } else {
        return leftLeaf;
      }
    }
  }

  depthFirstSearch(order_type) {
    let result = [];
    const traverse = (node) => {
      if (order_type === "pre_order") {
        result.push(node.data);
        node.left && traverse(node.left);
        node.right && traverse(node.right);
      } else if (order_type === "in_order") {
        node.left && traverse(node.left);
        result.push(node.data);
        node.right && traverse(node.right);
      } else if (order_type === "post_order") {
        node.left && traverse(node.left);
        node.right && traverse(node.right);
        result.push(node.data);
      }
    }

    traverse(this);

    return result
  }

  getDepth() {
    let size = this.BFSIterative().size;

    if (size === 1) {
      return 1;
    } else if (size > 1) {
      return Math.round(Math.log2(size - 2))
    } else {
      return 0;
    }
  }

  depthFirstForEach(order_type, cb) {
    const traverse = (node) => {
      if (order_type === "pre_order") {
        cb(node.data);
        node.left && traverse(node.left);
        node.right && traverse(node.right);
      } else if (order_type === "in_order") {
        node.left && traverse(node.left);
        cb(node.data);
        node.right && traverse(node.right);
      } else if (order_type === "post_order") {
        node.left && traverse(node.left);
        node.right && traverse(node.right);
        cb(node.data);
      }
    }

    traverse(this);
  }

  breadthFirstSearch(result = []) {
    let current = [this];

    while(current.length > 0){
      let next = [];

      for(let node of current) {
        result.push(node.data);

        if(node.left){
          next.push(node.left);
        }
        if(node.right){
          next.push(node.right);
        }
      }

      current = next;
    }

    return result;
  }

  BFSIterative() {
    let root = this.parent;
    let q = new Queue();
    let result = new Queue();
    result.enqueue(root);

    while(root) {
      if (root.left) {
        q.enqueue(root.left);
      }

      if (root.right) {
        q.enqueue(root.right);
      }

      if (!q.isEmpty()) {
        root = q.dequeue();
        result.enqueue(root);
      } else {
        root = null;
      }
    }

    return result;
  }

  breadthFirstForEach(cb) {
    let current = [this];

    while(current.length > 0){
      let next = [];

      for(let node of current) {
        cb(node.data);

        if(node.left){
          next.push(node.left);
        }
        if(node.right){
          next.push(node.right);
        }
      }

      current = next;
    }
  }

  reverseTreeRecursive(node) {
    if (!node) {
      return;
    }

    if (this.reversed) {
      let temp = node.left;
      node.left = node.left;
      node.right = temp;
      node.reversed = !!node.reversed;

      this.reverseTree(node.left)
      this.reverseTree(node.right);
    } else {
      let temp = node.right;
      node.right = node.left;
      node.left = temp;
      node.reversed = !!node.reversed;

      this.reverseTree(node.left);
      this.reverseTree(node.right);
    }
  }

  reverseTree(node) {
    if (!node) {
      return;
    }

    const stack = [];

    stack.push(node);
    if (!node.reversed) {
      while (stack.length > 0) {
        const node = stack.pop();
        if (node.left) { stack.push(node.left); }
        if (node.right) { stack.push(node.right); }

        const temp = node.left;
        node.left = node.right;
        node.right = temp;
      }
    } else {
      while (stack.length > 0) {
        const node = stack.pop();
        if (node.left) { stack.push(node.left); }
        if (node.right) { stack.push(node.right); }

        const temp = node.right;
        node.right = node.left;
        node.left = temp;
        node.reversed = !!node.reversed;
      }
    }

    return node;
  }

  findInOrderSuccessor(inputNode) {
    let result = null;

    if(inputNode.right){
      if(inputNode.right.left && !inputNode.right.left.left){
        return inputNode.right.left;
      } else if(inputNode.right.left && inputNode.right.left.left) {
        result = inputNode.right.left;
        while(result.left){
          result = result.left;
        }
      }
    } else {
      let rootInputNode = inputNode;
      let targetInputNode = inputNode.parent;
      while(targetInputNode.data <= rootInputNode.data){
        if(targetInputNode.parent){
          targetInputNode = targetInputNode.parent;
        } else {
          return;
        }
      }
      return targetInputNode
    }
    return result;
  }

  lowestCommonAncestor(inputNode1, inputNode2) {
    if (this.root === null) {
      return null;
    }

    let result = null;

    if (this.data > inputNode1 && this.data > inputNode2) {
      return this.left.lowestCommonAncestor(inputNode1, inputNode2)
    }

    if (this.data < inputNode1 && this.data < inputNode2) {
      return this.right.lowestCommonAncestor(inputNode1, inputNode2);
    }

    return this;
  }

  getMinDepth() {
    if (!this.right && !this.left) {
      return 1;
    }

    if (!this.left && this.right) {
      return this.right.getMinDepth() + 1;
    }

    if(!this.right && this.left) {
      return this.left.getMinDepth() + 1;
    }

    let left = this.left ? this.left : this;
    let right = this.right ? this.right : this;
    return Math.min(left.getMinDepth(), right.getMinDepth()) + 1;
  }

  getMaxPathSum() {
    let result = Number.NEGATIVE_INFINITY;

    const max_sum = (node) => {
      if (node == null){
        return 0;
      }

      let left_sum = Math.max(0, max_sum(node.left));
      let right_sum = Math.max(0, max_sum(node.right));
      result = Math.max(result, left_sum + node.data + right_sum);
      return Math.max(left_sum, right_sum) + node.data;
    };

    max_sum(this);
    return result;
  };
}

let a = new BinarySearchTree(10);
a.addNode(5);
a.addNode(15);
a.addNode(3);
a.addNode(7);
a.addNode(13);
a.addNode(18);
a.addNode(77);
a.addNode(75);
// console.log("75 FOUND: ??: ", a.search(75));
// console.log("BFS: ", a.breadthFirstSearch());
// console.log("IN: ", a.depthFirstSearch('in_order'));
// console.log("POST: ", a.depthFirstSearch('post_order'));
// console.log("PRE: ", a.depthFirstSearch('pre_order'));
console.log("NORMAL: ", a.breadthFirstSearch());
a.reverseTree(a.parent);
console.log("REVERSED: ", a.breadthFirstSearch());
// console.log("\n\n\nREVERSED DFS PRE ORDER: ", a.depthFirstSearch("pre_order"));
// console.log("REVERSED DFS IN ORDER: ", a.depthFirstSearch("in_order"));
// console.log("REVERSED DFS POST ORDER: ", a.depthFirstSearch("post_order"));
// console.log("CONTAINS 50: ", a.contains(50));
// a.deleteNode(50);
// console.log("CONTAINS 50: ", a.contains(50));
// console.log("A IS::::", a);
// console.log("\n\n\nREVERSED DFS PRE ORDER: ", a.depthFirstSearch("in_order"));

// a.reverseTree(a.parent);
// console.log("MAX IS: ", a.findMax());
// console.log("MIN IS: ", a.findMin());
// console.log(a.depthFirstSearch('in_order'));
// console.log(a.BFSIterative());
// console.log(a.breadthFirstSearch());
// console.log("DEPTH IS: ", a.getDepth());
// console.log("IN ORDER SUCCESSOR IS: ", a.findInOrderSuccessor(a.search(75)))
// console.log("LCA IS: ", a.lowestCommonAncestor(45, 77))
// console.log("MIN DEPTH IS: ", a.getMinDepth())
