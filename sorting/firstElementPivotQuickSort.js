// pivot is alays the left most
// or the first element

const quickSort = (arr, start, end) => {
  if (start < end) {
    let partitionedIndex = partition(arr, start, end);
    quickSort(arr, start, partitionedIndex - 1);
    quickSort(arr, partitionedIndex, end);
  };
}

const partition = (arr, start, end) => {
  // within the partition function
  // we have  selected pivot point
  // and we want to rearrange the
  // given arr in place, such that
  // all the elements lesser than
  // the selected pivot, (current element)
  // are on the left of the pivot
  // and all the elements greater
  // than the pivot are on the right
  // of the pivot, aka (selected element)
  let pivot = arr[start];
  let pivotIndex = start + 1;

  for (let currIdx = start + 1; currIdx <= end; currIdx++) {
    if (arr[currIdx] <= pivot) {
      if (currIdx !== pivotIndex) {
        swap(arr, currIdx, pivotIndex);
        pivotIndex++;
      }
    }
  }

  swap(arr, start, pivotIndex - 1);
  console.log("ARR IS: ", arr);
  return pivotIndex;
}

const swap = (arr, left, right) => {
  let temp = arr[right];
  arr[right] = arr[left];
  arr[left] = temp;
}

let arr = [1, 33, 25, -43, 66, 289];
quickSort(arr, 0, arr.length - 1)
console.log(arr);
