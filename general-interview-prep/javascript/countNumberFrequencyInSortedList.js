// Example of Divide And Conquer
// O(log n) Time Complexity

// Count number of occurrences
// (or frequency) in a sorted array

const binarySearchFirst = (arr, value) => {
  let begin = 0;
  let end = arr.length-1;
  let mid = -1;

  while (begin <= end) {
    mid = begin + (end - begin) / 2;
    if (arr[mid] < value) {
      begin = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  if ((begin <= arr.length - 1  && begin >= 0 && arr[begin] !== value)) {
    return -1;
  }

  return begin;
}

const binarySearchLast = (arr, value) => {
  let begin = 0;
  let end = arr.length - 1;
  let mid = -1;

  while (begin <= end) {
    mid = begin + (end - begin) / 2;
    if (arr[mid] > value) {
      end = mid - 1;
    } else {
      begin = mid + 1;
    }
  }

  if((end <= arr.length - 1  && end >= 0 &&  arr[end] !== value)) {
    return -1;
  }

  return end;
}

const count = (arr, value) => {
  let low = binarySearchFirst(arr, x);
  let high = binarySearchLast(arr, x);

  if (high >= low && low != -1 && high != -1) {
    return high - low + 1
  }

  return 0;
}

let arr = [1, 2, 2, 3, 3, 3, 3];
let x = 3;

console.log(`FREQUENCY OF ${x} IS: `, count(arr, x));
