/**
 * @param {number[]} nums
 * @return {number}
 */
const removeDuplicates = (nums) => {
  let j = 0;
  let i = 0;
  for (l = nums.length; i < l; i++) {
    if (nums[j] !== nums[i]) {
      nums[++j] = nums[i];
    }
  }

  return j + 1;
};
