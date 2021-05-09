/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var threeSum = function(nums) {
  nums.sort((a,b)=>a-b);
  let result = [];
  for (let i = 0; i < nums.length; i++) {
      let t = -nums[i];
      let left = i + 1, right = nums.length - 1;
      while(left < right) {
          if (nums[left] + nums[right] === t) {
              result.push([nums[i], nums[left], nums[right]]);
              while (nums[left+1] === nums[left++]);
              while (nums[right-1] === nums[right--]);
          } else if (nums[left]+nums[right] < t) {
              left++;
          } else {
              right--;
          }
      }
      while(nums[i+1]==nums[i]) i++
  }
  
  return result;
};