const bubbleSort = (arr) => {
  let temp, swapped = false;

  arr.forEach((element, i) => {
    swapped = false;
    arr.forEach((el, j) => {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
        swapped = true;
      }
    })
    if (swapped === false) {
      return;
    }
  });
}

let arr = [1, 9, 3, 6, 23, 54, 29];
console.log("\nARR BEFORE: ", arr);
bubbleSort(arr)
console.log("\nARR AFTER: ", arr);
