const insertionSort = (arr) => {
  let currentMarker, temp;

  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if (arr[j + 1] < arr[i]) {
        temp = arr[j + 1];
        arr[j + 1] = arr[i];
        arr[i] = temp;
      }
    }
  }
}


let arr = [1, 4, 6, 2, 6, 2, 78, 99];
console.log("ARR BEFORE: ", arr);

insertionSort(arr);
console.log("ARR AFTER SORTING IS: ", arr);

