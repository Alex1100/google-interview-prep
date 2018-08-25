const pivotedBinarySearch = (arr, value) => {
  let pivotPoint = Math.floor(arr.length/2);
  let firstSubArray = arr.slice(0, pivotPoint);
  let secondSubArray = arr.slice(pivotPoint, arr.length);
  let result = -1;
  let current = 'first';
  let currentArray = firstSubArray;
  let min = 0;
  let max = currentArray.length;
  let mid = Math.floor(currentArray.length/2);

  while(mid !== null) {
    console.log("MIN IS: ", min);
    console.log("MID IS: ", mid);
    console.log("MAX IS: ", max);
    console.log("CURRENT ARRAY IS: ", currentArray)
    if (value === currentArray[mid]) {
      result = mid;
      mid = null;
    } else if (value > currentArray[mid]) {
      min = mid + 1;
      mid = Math.floor((max + min)/2);
      currentArray = secondSubArray;
      current = 'second';
    } else if (value < currentArray[mid]) {
      currentArray = firstSubArray;
      max = mid - 1;
      mid = Math.floor((max - min)/2);
      current = 'first';
    }
  }

  return current === 'first' ? result : firstSubArray.length + result;
}


console.log(pivotedBinarySearch([100, 800, 500, 400, 600, 200, 700, 300], 800));
