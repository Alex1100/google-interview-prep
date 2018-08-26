const heapify = (arr, arrSize, i) => {
  let largest = i;
  let left = (2 * i) + 1;
  let right = (2 * i) + 2;

  if (left < arrSize && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < arrSize && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    let temp = arr[i];
    arr[i] = arr[largest];
    arr[largest] = temp;
    heapify(arr, arrSize, largest);
  }
}

const heapSort = (arr) => {
  let n = arr.length;
  for (let i = (n/2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  for (let j = n - 1; j >= 0; j--) {
    let temp = arr[0];
    arr[0] = arr[j];
    arr[j] = temp;
    heapify(arr, j, 0)
  }
}


let arr = [12, 11, 13, 5, 6, 7];
console.log('ARR BEFORE: ', arr);
heapSort(arr);
console.log("AFTER SORTING : ", arr);
