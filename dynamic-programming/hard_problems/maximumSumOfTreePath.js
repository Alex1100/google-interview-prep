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
}


const maximumPathSum = (root) => {
  let tempLeft = [];
  let tempRight = [];

  const traverseLeft = (node, temp) => {
    if (node === null) {
      return;
    }

    temp.push(node.data);

    if (node.left) {
      traverseLeft(node.left, temp);
    }

    if (node.right) {
      traverseLeft(node.right, temp);
    }
  }

  const traverseRight = (node, temp) => {
    if (node === null) {
      return;
    }

    temp.push(node.data);

    if (node.left) {
      traverseRight(node.left, temp);
    }

    if (node.right) {
      traverseRight(node.right, temp);
    }
  }

  traverseLeft(root.left, tempLeft);
  traverseRight(root.right, tempRight);

  tempLeft = [...tempLeft, root.data].reduce((acc, curr) => acc + curr, 0);
  tempRight = [root.data, ...tempRight].reduce((acc, curr) => acc + curr, 0);

  return Math.max(tempLeft, tempRight);
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
a.addNode(200);
a.addNode(40);
a.addNode(99);
a.addNode(1163)


console.log(maximumPathSum(a));
