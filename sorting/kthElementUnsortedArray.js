const kthElement = (arr, start, end, k) => {
  let rightThreshold = (end - start) + 1;

  if (k > 0 && k <= rightThreshold) {
    let position = randomPartition(arr, start, end);

    if (position - start === k - 1) {
      return arr[position];
    } else if (position - start > k - 1) {
      return kthElement(arr, start, position - 1, k);
    } else {
      return kthElement(arr, position + 1, end, (k - (position + start)) - 1);
    }
  }

  return -1;
}


const randomPartition = (arr, start, end) => {
  let pivot = Math.floor(start + Math.random() * (end - start));
  swap(arr, pivot, end);
  return partition(arr, start, end);
}

const partition = (arr, start, end) => {
  let pivot = arr[end];
  let low = start;

  for (let j = start; j < end; j++) {
    if (arr[j] <= pivot) {
      swap(arr, low, j);
      low++;
    }
  }

  swap(arr, low, end);
  return low;
}

const swap = (arr, left, right) => {
  let temp = arr[right];
  arr[right] = arr[left];
  arr[left] = temp;
}

let array = [1, 33, 25, -43, 66, 289];
console.log(kthElement(array, 0, array.length - 1, 3));
console.log(kthElement(array, 0, array.length - 1, 5));
console.log(array);

