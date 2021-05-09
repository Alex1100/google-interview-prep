/**
 * @param {number[]} nums
 */
 var Solution = function(nums) {
  this.items = nums;
};

function getRandomIntInclusive(min, max) {
return Math.floor(Math.random() * (max - min + 1) + min);
}

/** 
* @param {number} target
* @return {number}
*/
Solution.prototype.pick = function(target) {
  let filtered = this.items.map((el, i) => {
      if (el === target) {
          return [el, i];
      } else {
          return null;
      }
  }).filter(el => el !== null);

  if (filtered.length === 0) {
      return -1;
  }
  
  
  return filtered[getRandomIntInclusive(0, filtered.length - 1)][1];
};

/** 
* Your Solution object will be instantiated and called as such:
* var obj = new Solution(nums)
* var param_1 = obj.pick(target)
*/