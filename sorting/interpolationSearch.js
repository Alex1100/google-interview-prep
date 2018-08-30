const interpolationSearch = (arr, value) => {
  let low = 0;
  let high = arr.length -1;
  let position;

  while(low <= high && value >= arr[low] && value <= arr[high]) {
    position =
      Math.floor(low + (( (high - low) / (arr[high] - arr[low])) * (value - arr[low])));

      if (arr[position] === value) {
        return position;
      } else if (arr[position] < value) {
        low = position + 1;
      } else {
        high = position -1;
      }
  }

  return -1;
}


let arr = [-43, 1, 25, 33, 66, 289];
console.log(interpolationSearch(arr, 25));
