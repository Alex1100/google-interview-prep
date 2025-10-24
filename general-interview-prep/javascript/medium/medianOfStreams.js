// given a stream of numbers i.e. multiple calls

class BinaryHeap {
  constructor() {
    this.items = [];
    this.size = 0;
  }

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1)/2);
  }

  getLeftChild(parentIndex) {
    return (2 * parentIndex) + 1;
  }

  getRightChild(parentIndex) {
    return (2 * parentIndex) + 2;
  }

  insert(data) {
    if (data === undefined) {
      throw new Error('data must be a valid number');
    }

    this.items.push(data);
    this.size++;
    this.bubbleUp(this.items.length - 1, data);
  }

  removeTop() {
    let removed = this.items[0];
    let tail = this.items.pop();
    if (this.items.length) {
      this.items[0] = tail;
      this.bubbleDown(0, tail);
    }

    this.size--;
    return removed;
  }

  peek() {
    return this.items[0];
  }

  isEmpty() {
    return this.size === 0;
  }

  bubbleDown(parentIndex, parentData) {
    // while we arent' at the end of our
    // array (this.items)
    if (parentIndex < this.items.length) {
      let currentIndex = parentIndex;
      let currentData = parentData;

      // get the currentItems left and
      // right children's indexes
      const leftChildIndex = this.getLeftChild(parentIndex);
      const rightChildIndex = this.getRightChild(parentIndex);

      // for both left and right children
      // check to see if it's within
      // the bounds of the array (this.items)
      // if it is, then see if we
      // should swap the left child with the
      // currentChild

      // if we should swap then set
      // the current child to equal the
      // left when checking left child
      // and set the current child
      // to right when checking the
      // right child
      if (leftChildIndex < this.items.length) {
        const leftData = this.items[leftChildIndex];
        if (this.shouldSwap(leftData, currentData)) {
          currentIndex = leftChildIndex;
          currentData = leftData;
        }
      }

      if (rightChildIndex < this.items.length) {
        const rightData = this.items[rightChildIndex];
        if (this.shouldSwap(rightData, currentData)) {
          currentIndex = rightChildIndex;
          currentData = rightData;
        }
      }

      // finally check to see if the
      // current index is equal or not
      // to the parent/ element index
      // that called the bubbleDown
      // method

      // if it is skip
      // else swap the values
      // at the indexes between
      // currentIndex and parent index
      // and recursively call
      // the bubbleDown method again
      // until we have reached the end
      // of our Heaps array (this.items)
      if (currentIndex !== parentIndex) {
        this.items[parentIndex] = currentData;
        this.items[currentIndex] = parentData;
        this.bubbleDown(currentIndex, parentData);
      }
    }
  }

  bubbleUp(childIndex, childData) {
    // if child index is greater than
    // 0 aka our start of the heap's
    // array or (this.items)
    if (childIndex > 0) {
      const parentIndex = this.getParentIndex(childIndex);
      const parentData = this.items[parentIndex];
      // get the current child's
      // parent index and parent element
      // at the parent index

      // if we need to swap between
      // the child and it's parent
      // then swap their respective values
      // and recursively call the bubbleUp
      // method until we have reached the
      // start of our Heap's array
      // or (this.items)
      // with the childIndex argument
      // being the parent's
      // and vice versa since we swapped
      // them
      if (this.shouldSwap(childData, parentData)) {
        this.items[parentIndex] = childData;
        this.items[childIndex] = parentData;
        this.bubbleUp(parentIndex, childData);
      }
    }
  }
}

class MaxHeap extends BinaryHeap {
  constructor() {
    super();
  }

  shouldSwap(childData, parentData) {
    return childData > parentData;
  }
}

class MinHeap extends BinaryHeap {
  constructor() {
    super();
  }

  shouldSwap(childData, parentData) {
    return childData < parentData;
  }
}


// most optimal solution
// O(log n) Time Complexity
// O(n + n) || O(2n) Space Complexity
const getMedian = (arr) => {
  let lower = new MaxHeap();
  let higher = new MinHeap();
  let medians = [];

  for (let i = 0; i < arr.length; i++) {

    // insert numbers into respective
    // heaps
    if (lower.isEmpty() || arr[i] < lower.peek()) {
      lower.insert(arr[i]);
    } else {
      higher.insert(arr[i]);
    }

    // rebalance min and max heaps
    // so they only have one more
    // or one less than the other
    // heap
    let biggerHeap;
    let smallerHeap;

    if (lower.size > higher.size) {
      biggerHeap = lower;
      smallerHeap = higher;
    } else {
      biggerHeap = higher;
      smallerHeap = lower;
    }

    if (biggerHeap.size - smallerHeap.size >= 2) {
      smallerHeap.insert(biggerHeap.removeTop());
    }

    // set medians[i]
    if (biggerHeap.size === smallerHeap.size) {
      medians[i] = (biggerHeap.peek() + smallerHeap.peek())/2;
    } else {
      medians[i] = biggerHeap.peek();
    }
  }

  return medians;
}

console.log("MEDIANS ARE: ", getMedian([5, 15, 1, 3, 7]));
