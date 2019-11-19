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

  addNode(data) {
    if (this.parent === null && this.data === null && !this.left && !this.right) {
      this.data = data;
      this.parent = this;
      this.left = null;
      this.right = null;
    } else {
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
    }

    this.size++;
  }

  containsIterative(input) {
    let currentNode = this;

    while(currentNode) {
      if (currentNode.data === input) {
        return true;
      } else if (currentNode.data >= input) {
        if(currentNode.data === input) {
          return true;
        }

        if(currentNode.left === null) {
          return false;
        } else {
          currentNode = currentNode.left;
        }
      } else if (currentNode.data < input) {
        if (currentNode.right === null) {
          return false;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
  }

  findNodeRecursive(input) {
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
    return !!this.findNodeRecursive(input)
  };

  deleteNode(root, node) {
    if (root.data === null) {
      return;
    }
    let searchedResult = this.findNodeRecursive(node);

    if (!searchedResult) {
      return false;
    } else {
      let parent = searchedResult.parent;
      let counter = 0;


      if (this.size === 1) {
        this.parent = null;
        this.data = null;
        this.left = null;
        this.right = null;
        return true;
      } else if (this.size === 2) {
        if (this.right) {
          this.right = null;
          this.size--;
          return true;
        } else if (this.left) {
          this.left = null;
          this.size--;
          return true;
        }
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
        let largestValuesParent = largestValue.parent.right = null;
        searchedResult.data = largestValue.data;
      }
    }
    this.size--;
    return true;
  }

  findMin() {
    if (this.reversed) {
      let rightLeaf = this.right;

      if (rightLeaf && rightLeaf.right) {
        while(rightLeaf.right !== null) {
          rightLeaf = rightLeaf.right;
        }
        return rightLeaf;
      } else {
        return rightLeaf;
      }
    } else {
      let leftLeaf = this.left;
      if (leftLeaf && leftLeaf.left) {
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

      this.reverseTreeRecursive(node.left)
      this.reverseTreeRecursive(node.right);
    } else {
      let temp = node.right;
      node.right = node.left;
      node.left = temp;
      node.reversed = !!node.reversed;

      this.reverseTreeRecursive(node.left);
      this.reverseTreeRecursive(node.right);
    }
  }

  reverseTreeIterative(node) {
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
    if (inputNode === null) {
      return null;
    }

    console.log("INPUT NODE IS: ", inputNode)

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
    let result = -Infinity;

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
  }


  isValidBST(node = this, min = -Infinity, max = Infinity){
    if (node === null) {
      return true;
    }

    // false if this node violates min/max constraint
    if (node.data < min || node.data > max) {
      return false;
    }

    // Otherwise check the subtrees recursively
    // tightening the min or max constraint
    return (this.isValidBST(node.left, min, this.data -1) && this.isValidBST(node.right, this.data + 1, max))
  }

  closestValueRecursive(target, currentDistance = Infinity, closestNode = Infinity) {
    if (this === null) {
        return;
    }

    let tempDistance;

    if (this.data > target) {
        if (target > this.data) {
            tempDistance = target - this.data;
        } else {
            tempDistance = this.data - target;
        }

        Math.min(currentDistance, tempDistance) !== currentDistance ?
            closestNode = this.data :
            closestNode = closestNode;

        currentDistance = Math.min(currentDistance, tempDistance);

        if (this.left) {
            closestNode = this.left.closestValueRecursive(target, currentDistance, closestNode);
        }
    } else if (this.data < target) {
        if (target > this.data) {
            tempDistance = target - this.data;
        } else {
            tempDistance = this.data - target;
        }

        Math.min(currentDistance, tempDistance) !== currentDistance ?
            closestNode = this.data :
            closestNode = closestNode;

        currentDistance = Math.min(currentDistance, tempDistance);

        if (this.right) {
            closestNode = this.right.closestValueRecursive(target, currentDistance, closestNode);
        }
    } else if (this.data === target) {
        return target;
    }

    return closestNode;
  }

  diameterOfBinaryTree() {
      let ans = 1;

      const depth = function(node) {
          if (!node) {
              return 0;
          }
          let L = depth(node.left);
          let R = depth(node.right);
          ans = Math.max(ans, (L + R + 1));
          return Math.max(L, R) + 1;
      };

      depth(this);
      return ans - 1;
  };

  closestValueIterative(target) {
    let diff = Infinity;
    let answer = null;
    let root = this;
    while (root) {
      if (Math.abs(root.data - target) < diff) {
        diff = Math.abs(root.data - target)
        answer = root.data
      }
      if (target <= root.data) {
        root = root.left
      } else {
        root = root.right
      }
    }
    return answer;
  }

  findParent(node) {
    if (node === this.data) {
      return null;
    }

    if (node < this.data) {
      if (this.left === null) {
        return null;
      } else if (node === this.left.data) {
        return this;
      } else {
        return this.left.findParent(node);
      }
    } else {
      if (this.right === null) {
        return null;
      } else if (this.right.data === node) {
        return this;
      } else {
        return this.right.findParent(node);
      }
    }
  }
}

let a = new BinarySearchTree(100);
a.addNode(50);
a.addNode(45);
a.addNode(30);
a.addNode(70);
a.addNode(13);
a.addNode(180);
a.addNode(77);
a.addNode(75);
// console.log("75 FOUND: ??: ", a.findNodeRecursive(75));
console.log("BFS: ", a.breadthFirstSearch());
console.log("IN: ", a.depthFirstSearch('in_order'));
console.log("POST: ", a.depthFirstSearch('post_order'));
console.log("PRE: ", a.depthFirstSearch('pre_order'));
console.log("NORMAL: ", a.breadthFirstSearch());
a.reverseTreeIterative(a.parent);
console.log("REVERSED: ", a.breadthFirstSearch());
console.log("\n\n\nREVERSED DFS PRE ORDER: ", a.depthFirstSearch("pre_order"));
console.log("REVERSED DFS IN ORDER: ", a.depthFirstSearch("in_order"));
console.log("REVERSED DFS POST ORDER: ", a.depthFirstSearch("post_order"));
console.log("CONTAINS 50: ", a.contains(50));
a.deleteNode(100, 55);
console.log("CONTAINS 50: ", a.contains(50));
console.log("A IS::::", a);
console.log("\n\n\nREVERSED DFS PRE ORDER: ", a.depthFirstSearch("in_order"));

a.reverseTreeRecursive(a.parent);
console.log("MAX IS: ", a.findMax());
console.log("MIN IS: ", a.findMin());
console.log(a.depthFirstSearch('in_order'));
console.log("PREL ", a.depthFirstSearch('pre_order'));
console.log("POST: ", a.depthFirstSearch('post_order'));
console.log('DIAMETER OF BST IS: ', a.diameterOfBinaryTree());

console.log(a.BFSIterative());
console.log(a.breadthFirstSearch());
console.log("DEPTH IS: ", a.getDepth());
console.log("IN ORDER SUCCESSOR IS: ", a.findInOrderSuccessor(a.findNodeRecursive(75)))
console.log("LCA IS: ", a.lowestCommonAncestor(45, 77))
console.log("MIN DEPTH IS: ", a.getMinDepth(), "\n\n\n\n");
console.log("DELETING FIRST TIME: ", a.deleteNode(100, 100));
console.log("a is: ", a)
console.log("WHAT:: ", a.breadthFirstSearch())
a.deleteNode(77, 77);
console.log("WHAT:: ", a.breadthFirstSearch())
a.deleteNode(50, 50);
console.log("WHAT:: ", a.breadthFirstSearch())
a.deleteNode(70, 180);
console.log("WHAT:: ", a.breadthFirstSearch())
console.log("A IS: ", a);
a.deleteNode(70, 13);
console.log("WHAT:: ", a.breadthFirstSearch())
a.deleteNode(70, 30);
console.log("WHAT:: ", a.breadthFirstSearch())
console.log("a is: ", a)
a.deleteNode(70, 45);
console.log("WHAT:: ", a.breadthFirstSearch())
a.deleteNode(70, 70);
console.log("WHAT:: ", a.breadthFirstSearch())
a.addNode(77);
console.log("WHAT:: ", a.breadthFirstSearch())
a.addNode(78);
a.addNode(73);
a.addNode(71);
console.log("WHAT:: ", a.breadthFirstSearch())
console.log("78 PARENT IS: ", a.findParent(78));
