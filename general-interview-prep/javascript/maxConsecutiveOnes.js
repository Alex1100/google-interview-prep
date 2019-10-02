/**
 * @param {number[]} nums
 * @return {number}
 */
const findMaxConsecutiveOnes = (nums) => {
  let count = 0;
  let max = 0;

  for (let i = 0; i < nums.length; i++) {
    let temp = count;
    count += nums[i];
    if(temp === count || i == nums.length - 1){
      if(count > max){
        max = count;
      }
      count = 0;
    }
  }

  return max;
};
