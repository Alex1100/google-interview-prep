let MaxBinaryHeap = require('../heaps/max-heap');
let MinBinaryHeap = require('../heaps/min-heap');

// Naive approach w/out Heaps
class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(item) {
    if (this.isEmpty()) {
      this.items.push(item);
    } else {
      let added = false;
      for (let i = 0; i < this.items.length; i++) {
        if (item[1] < this.items[i][1]) {
          this.items.splice(i, 0, item);
          added = true;
          break;
        }
      }
      if (!added) {
        this.items.push(item);
      }
    }
  }

  dequeue() {
    let value = this.items.shift();
    return value[0];
  }

  front() {
    return this.items[0];
  }

  back() {
    return this.items[this.items.length - 1];
  }

  size() {
    return this.items.length;
  }

  isEmpty() {
    return this.items.length === 0;
  }
}




let pq = new PriorityQueue();

pq.enqueue(['Steve', 2]);
pq.enqueue(['Jack', 4]);
pq.enqueue(['Phillip', 1]);
pq.enqueue(['Doug',  3]);

console.log("PQ IS: ", pq);

pq.dequeue();

console.log("PQ NOW IS: ", pq);




//Better Approach
class PriorityQueueTwo {
  constructor() {
    this.heap = [];
    this.size = 0;
  }

  enqueue(item) {
    let position = this.size;
    this.heap[position] = item;

    while(position > 0) {
      let parent = ((position + 1) / 2) -1;
      if (this.heap[parent] >= this.heap[position]) {
        break;
      }
      this.swapIndices(parent, pos);
      position = parent;
    }

    this.size++;
  }

  dequeue() {
    if (this.size === 0) {
      throw new Exception('Queue is Empty');
    } else {
      let toReturn = this.heap[0];
      this.heap[0] = this.heap[this.size - 1];

      let position = 0;
      while(position < this.size / 2) {
        let leftChild = position * 2 + 1;
        let rightChild = leftChild + 1;

        if (rightChild < this.size && this.heap[leftChild] < this.heap[rightChild]) {
          if (this.heap[position] >= this.heap[rightChild]) {
            break;
          }
          this.swapIndices(position, rightChild);
          position = rightChild;
        } else {
          if (this.heap[position] >= this.heap[leftChild]) {
            break;
          }

          this.swapIndices(position, leftChild);
          position = leftChild;
        }
      }

      return toReturn;
    }
  }

  swapIndices(i, j) {
    let temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
}


// Best Approach with Min/Max Binary Heaps

class MaxPriorityQueue extends MaxBinaryHeap {
  enqueue(item) {
    this.add(item);
  }

  dequeue() {
    return this.removeHead();
  }

  front() {
    return this.array[0];
  }

  size() {
    return this.array.length;
  }

  isEmpty() {
    return this.array.length === 0;
  }
}

let g = new MaxPriorityQueue();

g.enqueue(3);
console.log("G IS: ", g)
g.enqueue(10);
g.enqueue(1);
g.enqueue(4);
g.enqueue(15);
g.enqueue(7);

console.log("G IS: ", g);

console.log(g.dequeue());
console.log(g.dequeue());
console.log(g.dequeue());
console.log(g.dequeue());
console.log(g.dequeue());
console.log(g.dequeue());


class MinPriorityQueue extends MinBinaryHeap {
  enqueue(item) {
    this.add(item);
  }

  dequeue() {
    return this.removeHead();
  }

  front() {
    return this.array[0];
  }

  size() {
    return this.array.length;
  }

  isEmpty() {
    return this.array.length === 0;
  }
}

let mm = new MinPriorityQueue();

mm.enqueue(10);
mm.enqueue(11);
mm.enqueue(20);
mm.enqueue(25);
mm.enqueue(1);
console.log("MM IS: ", mm);
console.log(mm.dequeue());
console.log(mm.dequeue());
console.log(mm.dequeue());
console.log(mm.dequeue());
console.log(mm.dequeue());
