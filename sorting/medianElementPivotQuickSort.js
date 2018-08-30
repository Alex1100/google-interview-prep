const quickSort = (arr, start, end) => {
  if (start < end) {
    let pivotIndex = getMedian(arr, start, end);
    quickSort(arr, start, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, end);
  }
}

const getMedian = (arr, start, end) => {
  let middle = Math.floor(start + end)/2;
  let upper = start;
  let lower = end;

  if (arr[start] > arr[middle]) {
    swap(arr, middle, start);
  }

  if (arr[start] > arr[end]) {
    swap(arr, start, end);
  }

  if (arr[middle] > arr[end]) {
    swap(arr, end, middle);
  }

  return partition(arr, start, end);
}

const partition = (arr, start, end) => {
  let left = start;
  let right = end;
  let pivot = arr[start];

  while(left < right) {
    while(arr[right] > pivot) {
      right--;
    }

    while((left < right) && arr[left] <= pivot) {
      left++;
    }

    if (left < right) {
      swap(arr, left, right);
    }
  }

  arr[start] = arr[right];
  arr[right] = pivot;

  return right;
}

const swap = (arr, left, right) => {
  let temp = arr[right];
  arr[right] = arr[left];
  arr[left] = temp;
}


let arr = [1, 33, 25, -43, 66, 289];
quickSort(arr, 0, arr.length - 1)
console.log(arr);
