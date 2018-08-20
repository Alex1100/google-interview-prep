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
    if (data < this.data) {
      if (!this.left) {
        this.left = new BinarySearchTree(data);
        this.left.parent = this;
        this.size++;
      } else {
        this.left.addNode(data)
      }
    } else if (data > this.data) {
      if (!this.right) {
        this.right = new BinarySearchTree(data);
        this.right.parent = this;
        this.size++;
      } else {
        this.right.addNode(data);
      }
    } else {
      throw Error('Node Already Exists');
    }
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

  reverseTree(node) {
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
}

let a = new BinarySearchTree(100);
a.addNode(50);
a.addNode(200);
a.addNode(150);
a.addNode(300);
a.addNode(120);
a.addNode(45);
a.addNode(77);
a.addNode(75);
console.log("75 FOUND: ??: ", a.search(75));
console.log("BFS: ", a.breadthFirstSearch());
console.log("IN: ", a.depthFirstSearch('in_order'));
console.log("POST: ", a.depthFirstSearch('post_order'));
console.log("PRE: ", a.depthFirstSearch('pre_order'));
a.reverseTree(a.parent);
console.log("REVERSED: ", a)
console.log("\n\n\nREVERSED DFS PRE ORDER: ", a.depthFirstSearch("pre_order"))
console.log("REVERSED DFS IN ORDER: ", a.depthFirstSearch("in_order"))
console.log("REVERSED DFS POST ORDER: ", a.depthFirstSearch("post_order"))
console.log("CONTAINS 50: ", a.contains(50))
a.deleteNode(50);
console.log("CONTAINS 50: ", a.contains(50))
console.log("A IS::::", a);
console.log("\n\n\nREVERSED DFS PRE ORDER: ", a.depthFirstSearch("in_order"))

a.reverseTree(a.parent);
console.log("MAX IS: ", a.findMax());
console.log("MIN IS: ", a.findMin());
console.log(a.depthFirstSearch('in_order'))
console.log(a.BFSIterative());
console.log(a.breadthFirstSearch())
