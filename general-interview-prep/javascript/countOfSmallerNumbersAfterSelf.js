/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var countSmaller = function(nums) {
  let array = [];
  let arr = [];
  let length = nums.length;
  let index = 0;
  let inserIndex;
  for (let i = length - 1; i >= 0; i--) {
      let d = nums[i];
      index = binarySearch(arr, d);
      inserIndex = index;

      while (arr[inserIndex] === d) {
        inserIndex--;
      }
      if (index !== inserIndex) inserIndex++;
      arr.splice(index, 0, d);
      array.unshift(inserIndex);
  }
  return array;
};

const binarySearch = (arr, val) => {
let high = arr.length - 1;
let mid = 0;
let low = 0;
while (low <= high) {
  mid = Math.floor((low + high) / 2);
  if (arr[mid] === val) {
    return mid;
  } else if (arr[mid] > val) {
    high = mid - 1;
  } else {
    low = mid + 1;
  }
}

return low;
}

/*
* Input: [5,2,6,1]
* Output: [2,1,1,0]
*/
