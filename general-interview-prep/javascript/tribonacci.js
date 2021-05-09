// FB

/**
 * @param {number} n
 * @return {number}
 */
 var tribonacci = function(n) {
  if (n === 0) return 0;
  let nums = [0, 1, 1];
  
  for (let i = 3; i <= n; ++i) {
      nums.push(nums[i - 1] + nums[i - 2] + nums[i - 3]);
  }

  return nums[n];
};