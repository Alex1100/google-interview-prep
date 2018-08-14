// Tree Based DisjointSet implementation #1
class DisjointSetOne {
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

let S1 = new DisjointSetOne(1);
let S3 = new DisjointSetOne(4);
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

  setUnion(set1, set2) {
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

S5.setUnion(S5, S6);
console.log(S6)
console.log(S5)
console.log(S6.find(5))
console.log(S5.find(S6))
S5.setUnion(S7, S5)
console.log(S7)
console.log(S5)
console.log(S7.find(5))
console.log(S6.listChildrenOfSet())



//DisjointSet implementation #3 with a ranking strategy
class DisjointSet {
  constructor(data) {
    this.parent = data;
    this.data = data;
    this.children = {};
    this.rank = 0;
  }

  find(node) {
    if (this.parent === node) {
      return node;
    } else {
      return this.find(this.parent)
    }
  }

  setUnion(set) {
    if (this.rank > set.rank) {
      set.parent = this;
      this.children[set.parent] = set;
    } else if (this.rank < set.rank) {
      set.children[this.parent] = this;
      this.parent = set;
    } else {
      set.children[this.parent] = this;
      this.parent = set;
      set.rank++;
    }
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



let ST5 = new DisjointSet(5);
let ST6 = new DisjointSet(6);
let ST7 = new DisjointSet(7);
let ST8 = new DisjointSet(8);
let ST9 = new DisjointSet(9);
let ST10 = new DisjointSet(10);

console.log(ST5);
console.log(ST6);
console.log(ST7);
console.log(ST8);
console.log(ST9);
console.log(ST10);
console.log(ST6.find(5));
console.log(ST5.find(ST6));
ST8.setUnion(ST6);
ST5.setUnion(ST10);
ST9.setUnion(ST7);
ST5.setUnion(ST8);
ST8.setUnion(ST10);
console.log("\n\n\n\nFOUND??: ", ST5.find(7));
console.log("\n\n\n\nFOUND??: ", ST6.find(9));
console.log("\n\n\n\nFOUND??: ", ST7.find(5));
console.log("\n\n\n\nFOUND??: ", ST8.find(5));
console.log("\n\n\n\nFOUND??: ", ST9.find(5));
console.log("\n\n\n\nFOUND??: ", ST10.find(8));
console.log("\n\n\n5: ", ST5, "\n\n\n6: ", ST6, "\n\n\n7: ", ST7, "\n\n\n8: ", ST8, "\n\n\n9: ", ST9, "\n\n\n10: ", ST10);
console.log("\n\n\n\n\nCHILDREN FROM SET ST5 ARE: ", ST5.listChildrenOfSet())
console.log("\n\n\n\n\nCHILDREN FROM SET ST6 ARE: ", ST6.listChildrenOfSet())
console.log("\n\n\n\n\nCHILDREN FROM SET ST7 ARE: ", ST7.listChildrenOfSet())
console.log("\n\n\n\n\nCHILDREN FROM SET ST8 ARE: ", ST8.listChildrenOfSet())
console.log("\n\n\n\n\nCHILDREN FROM SET ST9 ARE: ", ST9.listChildrenOfSet())
console.log("\n\n\n\n\nCHILDREN FROM SET ST10 ARE: ", ST10.listChildrenOfSet())

module.exports = {
  DisjointSetOne,
  DisjointSetTwo,
  DisjointSet
}
