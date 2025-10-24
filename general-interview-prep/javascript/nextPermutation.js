/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 var nextPermutation = function(nums) {
  if (nums.length < 3) {
      nums.reverse();
      return;
  }
  
  let i = nums.length - 2, j = nums.length - 1;
  // Find the first index from the right where the value is less than the next value. If this doesn't exist then i = -1.
  while (nums[i] >= nums[i + 1] && i >= 0) {
      i--;
  }
  if (i >= 0) {
      // Find the first index from the right where the value is greater than the value found in previous step.
      while (nums[j] <= nums[i]) {
          j--;
      }
      // Swap the two values found.
      [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  // Reverse everything after index i found above. Note if i = -1 then the whole array is reversed.
  for (i++, j = nums.length - 1; i < j; i++, j--) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
  }
};