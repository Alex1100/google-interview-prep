/**
 * initialize your data structure here.
 */

function MedianFinder() {
    this.numbers = [];
    this.median = null;
}

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
    this.numbers.push(num);
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
    if (this.numbers.length === 0) {
        return 0;
    }

    this.median = Number((this.numbers.reduce((acc, curr) => acc + curr, 0) / this.numbers.length).toFixed(4));

    return this.median;
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */


 let a = new MedianFinder();
console.log('A IS: ', a);
 a.addNum(1);
 a.addNum(2);
 console.log(a);
 console.log(a.findMedian());
 a.addNum(3);
 console.log(a.findMedian());
