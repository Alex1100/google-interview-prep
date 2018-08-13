class BinarySearchTree {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.parent = this;
  }

  addNode(data) {
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
    }
  }

  contains(input, reversed = false) {
    let result = false;

    let inclusionCheck = function(input) {
      if(!this) {
        result = false;
      } else if(input === this.data){
        result = true;
      } else if(!reversed && input < this.data){
        inclusionCheck.call(this.left, input);
      } else if(!reversed && input > this.data){
        inclusionCheck.call(this.right, input);
      } else if (reversed && input < this.data) {
        inclusionCheck.call(this.right, input);
      } else if (reversed && input > this.data) {
        inclusionCheck.call(this.left, input);
      }
    };

    inclusionCheck.call(this, input);
    return result;
  };

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
    if (node === null) {
      return;
    }

    let temp = node.right;
    node.right = node.left;
    node.left = temp;

    this.reverseTree(node.left);

    this.reverseTree(node.right)
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
console.log("BFS: ", a.breadthFirstSearch());
console.log("IN: ", a.depthFirstSearch('in_order'));
console.log("POST: ", a.depthFirstSearch('post_order'));
console.log("PRE: ", a.depthFirstSearch('pre_order'));
a.reverseTree(a.parent);
console.log("REVERSED: ", a)
console.log("\n\n\nREVERSED DFS PRE ORDER: ", a.depthFirstSearch("pre_order"))
console.log("REVERSED DFS IN ORDER: ", a.depthFirstSearch("in_order"))
console.log("REVERSED DFS POST ORDER: ", a.depthFirstSearch("post_order"))
console.log("CONTAINS 200: ", a.contains(200, true))
