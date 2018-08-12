// Tree Based DisjointSet implementation #1
class DisjointSet {
  constructor(data) {
    this.parent = data;
    this.node = data;
    this.children = []
  }

  addChild(child_node) {
    this.children.push(new DisjointSet(child_node))
    let currentIndex = this.children.length - 1;
    this.children[currentIndex].parent = this;
  }

  find(node) {
    let found = false;
    let current = this;
    if (current.node === node) {
      return current.node;
    }
    for (let i = 0; i < current.children.length; i++) {
      current = current.children[i]
      if (current.node === node) {
        return current.node
      }
    }
    return found;
  }

  setUnion(set1, set2) {
    if (!set2.find(set1.node) && !set1.find(set2.node)) {
      set1.parent = set2;
      set2.children.push(set1)
      return set2.children
    }
  }
}

let S1 = new DisjointSet(1);
let S3 = new DisjointSet(4);
S1.addChild(2);
S3.addChild(7);
console.log(S1);
console.log(S1.find(1));
console.log(S1.find(2));
console.log(S1.find(3));
console.log(S1.setUnion(S1, S3));
console.log(S1);





// DisjointSet Implementation Two without a Tree
class DisjointSetTwo {
  constructor(data) {
    this.parent = data;
    this.data = data;
    this.children = {};
  }

  find(node) {
    if (this.parent === node) {
      return node;
    } else {
      return this.find(this.parent)
    }
  }

  union(set1, set2) {
    set2.children[set1.parent] = set1;
    set1.parent = set2;
  }

  listChildrenOfSet() {
    let temp = [];
    let current = this.children[Object.keys(this.children)];
    let counter = 0;

    while(current) {
      let collection = Object.keys(current.children);

      if (collection.length > 0) {
        temp.push(current.data)
        current = current.children[collection[counter]];
        counter++;
      } else {
        counter = 0;
        temp.push(current.data)
        current = current.children[collection[counter]];
      }
    }

    return { parent: this.data, members: temp };
  }
}


let S5 = new DisjointSetTwo(5);
let S6 = new DisjointSetTwo(6);
let S7 = new DisjointSetTwo(7);
let S8 = new DisjointSetTwo(8);
let S9 = new DisjointSetTwo(9);

S5.union(S5, S6);
console.log(S6)
console.log(S5)
console.log(S6.find(5))
console.log(S5.find(S6))
S5.union(S7, S5)
console.log(S7)
console.log(S5)
console.log(S7.find(5))
console.log(S6.listChildrenOfSet())

