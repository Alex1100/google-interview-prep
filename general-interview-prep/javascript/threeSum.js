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
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var threeSumToTarget = function(array, target) {
    array.sort((a,b) => a - b);
   const triplets = [];

   for(let i=0; i < array.length - 2; i++){
       if(array[i] != array[i-1]){ // making sure our solution set does not contain duplicate triplets
           let left = i + 1;
         let right = array.length - 1;

           while (left < right){
               const currentSum = array[i] + array[left] + array[right];
               if (currentSum === target){
                   triplets.push([array[i], array[left], array[right]]);
                   while(array[left] == array[left + 1]) left ++
                   while(array[right] == array[right - 1]) right -- // making sure our solution set does not contain duplicate triplets
                   left ++;
                   right --;
               } else if(currentSum < target) {
                   left ++
               } else if(currentSum > target){
                   right --
               }
           }
       }
   }
   return triplets
};

console.log(threeSumToTarget([1, 2, 5, 6, 7, 8], 8));