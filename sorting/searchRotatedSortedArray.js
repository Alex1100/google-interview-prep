const searchRotatedSortedArray = (arr, min, max, value) => {
  if (min > max) {
    return -1;
  }

  let mid = Math.floor((max - min)/2) + min;

  if (arr[mid] === value) {
    return mid;
  } else if (arr[min] <= arr[mid]) {
    if (value >= arr[min] && value <= arr[mid]) {
      return searchRotatedSortedArray(arr, min, mid - 1, value);
    }

    return searchRotatedSortedArray(arr, mid + 1, max, value);
  } else if (value >= arr[mid] && value <= arr[max]) {
    return searchRotatedSortedArray(arr, mid + 1, max, value);
  }

  return searchRotatedSortedArray(arr, min, mid - 1, value);
}

let arr = [5, 6, 7, 8, 9, 10, 1, 2, 3];
console.log(searchRotatedSortedArray(arr, 0, arr.length - 1, 2));
