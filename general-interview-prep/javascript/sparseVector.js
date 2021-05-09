// FB

/**
 * @param {number[]} nums
 * @return {SparseVector}
 */
 var SparseVector = function(nums) {
  let hashMap = {};
  for (let i = 0; i < nums.length; i++) {
      hashMap[i] = nums[i];
  }
  this.size = nums.length;
  this.numsMap = nums;
};

// Return the dotProduct of two sparse vectors
/**
* @param {SparseVector} vec
* @return {number}
*/
SparseVector.prototype.dotProduct = function(vec) {
  let productSum = 0;
  
  for (let i = 0; i < vec.size; i++) {
      productSum += this.numsMap[i] * vec.numsMap[i];
  }
  
  return productSum;
};

// Your SparseVector object will be instantiated and called as such:
// let v1 = new SparseVector(nums1);
// let v2 = new SparseVector(nums2);
// let ans = v1.dotProduct(v2);