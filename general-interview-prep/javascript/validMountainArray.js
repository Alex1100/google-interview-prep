/**
 * @param {number[]} arr
 * @return {boolean}
 */
 var validMountainArray = function(arr) {
  let shouldIncrease = findPeak(arr) !== 0 && findPeak(arr) !== arr.length - 1;

  if (!shouldIncrease) {
      return false;
  }
  
  for (let i = 0; i < arr.length; i++) {
      if (shouldIncrease && arr[i] > arr[i + 1]) {
          shouldIncrease = false;
      } else if (!shouldIncrease && arr[i] < arr[i + 1]) {
          return false;
      } else if (arr[i] === arr[i + 1]) {
          return false;
      }
  }
  
  return true;
};

const findPeak = (arr) => {
  let maxIndex = 0;
  
  for (let i = 0; i < arr.length; i++) {
      maxIndex = arr[maxIndex] <= arr[i] ? i : maxIndex;
  }
  
  return maxIndex;
}