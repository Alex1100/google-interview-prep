const binarySearch = (arr, value) => {
  let result = null;

  let max = arr.length - 1;
  let min = 0;
  let mid = Math.floor(arr.length/2);

  while(mid !== null) {
    if (value > arr[mid]) {
      min = mid + 1;
      mid = Math.floor((max + min)/2);
    } else if (value < arr[mid]) {
      max = mid - 1;
      mid = Math.floor((max - min) / 2);
    } else if (value === arr[mid]) {
      result = mid;
      mid = null;
    }
  }

  return result;
}

console.log(binarySearch([100, 200, 300, 400, 500, 600, 700, 800], 100));
