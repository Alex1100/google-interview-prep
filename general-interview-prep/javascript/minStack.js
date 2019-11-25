/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.items = []
    this.min = Infinity;
    this.size = 0;
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.items.push(x);
    this.size++;
    if (this.min > x) {
        this.min = x;
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    if (this.size === 0) {
        return null;
    }

    const popped = this.items[this.size - 1];
    this.size--;
    if (this.size === 0) {
        this.items = [];
    } else {
        this.items = this.items.slice(0, this.size);
    }

    if (popped === this.min) {
        this.min = Infinity;
        for (let i = 0; i < this.size; i++) {
            if (this.items[i] < this.min) {
                this.min = this.items[i];
            }
        }
    }

    return popped;
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.items[this.size - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this.min;
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */




 /**
  * initialize your data structure here.
  */

 class MinStack {
     constructor() {
         this.items = [];
         this.size = 0;
         this.min = -1;
     }

     push(x) {
         this.items.push(x);
         this.size++;
         if (this.min === -1) {
             this.min = 0;
         } else {
             if (this.items[this.min] >= this.items[this.size - 1]) {
                 this.min = this.size - 1;
             }
         }
     }

     pop() {
         let popped = this.items.pop();
         this.size--;
         if (this.min === this.size) {
             this.min = 0;
             this.items.forEach((item, idx) => {
                 if (item <= this.items[this.min]) {
                     this.min = idx;
                 }
             });
         }

         return popped;
     }

     top() {
         return this.items[this.size - 1];
     }

     getMin() {
         return this.items[this.min];
     }
 }

 /**
  * Your MinStack object will be instantiated and called as such:
  * var obj = new MinStack()
  * obj.push(x)
  * obj.pop()
  * var param_3 = obj.top()
  * var param_4 = obj.getMin()
  */
