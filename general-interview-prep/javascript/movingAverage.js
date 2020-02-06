/**
 * Initialize your data structure here.
 * @param {number} size
 */

class MovingAverage {
    constructor(size) {
        this.windowSize = size;
        this.average = 0;
        this.items = [];
    }

    next(val) {
        this.items.push(val);
        if (this.windowSize > this.items.length) {
            return this.items.reduce((a, b) => a + b, 0) / this.items.length;
        } else {
            return this.items.slice(this.items.length - this.windowSize).reduce((a, b) => a + b, 0) / this.windowSize;
        }
    }
}
/**
 * Your MovingAverage object will be instantiated and called as such:
 * var obj = new MovingAverage(size)
 * var param_1 = obj.next(val)
 */
