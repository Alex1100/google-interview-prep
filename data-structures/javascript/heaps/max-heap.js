// https://medium.com/basecs/learning-to-love-heaps-cef2b273a238

class BinaryMaxHeap {
  constructor(data = []) {
    this.array = [];
    this.nodes = {};
    if (data && Array.isArray(data)) {
      this.array = data;
      const length = this.array.length;
      for (let i = Math.floor((length - 1) / 2); i >= 0; i--) {
        this.bubbleDown(i, this.array[i]);
      }
    }
  }

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  getLeftChild(parentIndex) {
    return (parentIndex * 2) + 1;
  }

  getRightChild(parentIndex) {
    return (parentIndex * 2) + 2;
  }

  add(data) {
    if (data === undefined) {
      throw new Error('data must be valid to add');
    }
    this.array.push(data);
    this.bubbleUp(this.array.length - 1, data);
    this.nodes[data] = true;
  }

  removeHead() {
    const headNode = this.array[0];
    const tailNode = this.array.pop();
    if (this.array.length) {
      this.array[0] = tailNode;
      this.bubbleDown(0, tailNode);
    }
    delete this.nodes[headNode];
    return headNode;
  }

  bubbleDown(parentIndex, parentData) {
    if (parentIndex < this.array.length) {
      let targetIndex = parentIndex;
      let targetData = parentData;
      const leftChildIndex = this.getLeftChild(parentIndex);
      const rightChildIndex = this.getRightChild(parentIndex);
      const trySwap = (index, array, shouldSwap) => {
        if (index < array.length) {
          const data = array[index];
          if (shouldSwap(data, targetData)) {
            targetIndex = index;
            targetData = data;
          }
        }
      };
      trySwap(leftChildIndex, this.array, this.shouldSwap);
      trySwap(rightChildIndex, this.array, this.shouldSwap);
      if (targetIndex !== parentIndex) {
        this.array[parentIndex] = targetData;
        this.array[targetIndex] = parentData;
        this.bubbleDown(targetIndex, parentData);
      }
    }
  }

  bubbleUp(childIndex, childData) {
    if (childIndex > 0) {
      const parentIndex = this.getParentIndex(childIndex);
      const parentData = this.array[parentIndex];
      if (this.shouldSwap(childData, parentData)) {
        this.array[parentIndex] = childData;
        this.array[childIndex] = parentData;
        this.bubbleUp(parentIndex, childData);
      }
    }
  }

  shouldSwap(childData, parentData) {
    return childData > parentData;
  }

  hasNode(data) {
    // O(1) Constant time complexity
    return this.nodes[data] === true
  }

  contains(data) {
    let sortedData = this.array;
    let min = 0;
    let max = sortedData.length - 1;

    while(min <= max) {
      let mid = sortedData.length % 2 !== 0 ? min + (max-min)/2 : Math.round(min + (max - min)/2);

      if (data < sortedData[mid]) {
        if (sortedData[mid - 1] === data || sortedData[mid + 1] === data || sortedData[mid - 2] === data || sortedData[mid + 2] === data) {
          return true;
        }
        min = mid + 2 >= sortedData.length ? mid + 1 : mid + 2;
      } else if (data > sortedData[mid]) {
        if (sortedData[mid - 1] === data || sortedData[mid + 1] === data || sortedData[mid - 2] === data || sortedData[mid + 2] === data) {
          return true;
        }
        max = mid - 2 < 0 ? mid - 1 : mid - 2;
      } else {
        return true;
      }
    }

    return false;
  }
}



console.log("\n\n\n\n");
let c = new BinaryMaxHeap();
c.add(3);
c.add(9);
c.add(33);
c.add(1);
c.add(4);
c.add(5);
c.add(6);
c.add(10);
c.add(2);
console.log("OUR NEW BinaryMaxHeap IS: ", c);
console.log(c.contains(23))
console.log(c.contains(5))
console.log(c.contains(33))
console.log(c.contains(10))
console.log(c.hasNode(23))
console.log(c.hasNode(5))
console.log(c.hasNode(33))
console.log(c.hasNode(10))

module.exports = BinaryMaxHeap;
