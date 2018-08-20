class Trie {
  constructor(data) {
    this.data = data;
    this.children = [];
    this.parent = null;
  }

  addNode(node) {
    let newNode = new Trie(node);
    newNode.parent = this;
    this.children.push(newNode);
  }

  removeFromParent() {
    if (this.parent) {
      let childNodeIndex = this.parent.children.indexOf(this);
      this.parent.children.splice(childNodeIndex);
      this.parent = null;
    }
  }

  removeNode(node) {
    let idx = this.indexOf(node);
    if (idx > 0) {
      this.children = [...this.children.slice(0, idx), ...this.children.slice(idx + 1)]
    } else if (idx === this.children.length - 1) {
      this.children.pop();
    } else {
      this.children = this.children.slice(1);
    }
  }

  contains(target) {
    let result = false;

    let helper = function (child){
      if(child.data === target){
        result = true;
      } else if(child.data !== target && child.children.length > 0){
        for(let j = 0; j < child.children.length; j++){
          helper(child.children[j]);
        }
      }
    };

    if(this.data === target){
      return true;
    } else if(this.data !== target){
      for(let i = 0; i < this.children.length; i++){
        helper(this.children[i]);
      }
    }

    return result;
  };

  BFSUtil(child, result) {
    if(child.data) {
      result.push(child.data);
    }

    if (child.data && child.children.length > 0) {
      for (let j = 0; j < child.children.length; j++) {
        this.BFSUtil(child.children[j], result);
      }
    }
  }


  BFS(result = []) {
    let root = this;
    result.push(root.data);

    for (let i = 0; i < this.children.length; i++) {
      let child = this.children[i];
      this.BFSUtil(child, result);
    }

    return result;
  }
}


let a = new Trie(1);

a.addNode(4);
a.addNode(7);
a.addNode(10);
a.children[2].addNode(5)
console.log(a.children[2].contains(12));
console.log(a.BFS())
