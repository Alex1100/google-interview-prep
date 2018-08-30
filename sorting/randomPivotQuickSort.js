const quickSort = (arr, start, end) => {
  if (start < end) {
    let partioned_index = randomPartition(arr, start, end)
    quickSort(arr, start, partioned_index - 1);
    quickSort(arr, partioned_index + 1, end);
  }
};

const randomPartition = (arr, start, end) => {
  let rand = Math.floor(Math.random() * (end - start)) + start;
  swap(arr, rand, end);
  return partition(arr, start, end);
};

const partition = (arr, start, end) => {
  let pivot = arr[end];
  let pivotIndex = start - 1;

  for (let j = start; j < end; j++) {
    if (arr[j] <= pivot) {
      pivotIndex++;
      swap(arr, pivotIndex, j)
    }
  }

  swap(arr, pivotIndex + 1, end);
  return pivotIndex + 1;
};

const swap = (arr, left, right) => {
  let temp = arr[right];
  arr[right] = arr[left];
  arr[left] = temp;
};


let arr = [1, 33, 25, -43, 66, 289];
quickSort(arr, 0, arr.length - 1)
console.log(arr);
