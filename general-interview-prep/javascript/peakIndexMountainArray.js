/**
 * @param {number[]} arr
 * @return {number}
 */
 var peakIndexInMountainArray = function(arr) {
  let max = -Infinity;
  let left = 0, right = arr.length - 1, maxIndex = -1;
  
  while (left <= right) {
      if (arr[left] > max) {
          max = arr[left];
          maxIndex = left;
      }
      
      if (arr[right] > max) {
          max = arr[right];
          maxIndex = right;
      }
      
      left++;
      right--;
  }
  
  return maxIndex;
};