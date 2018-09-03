const radixSort = (arr) => {
  let maximumNumberOfDigits = getMax(arr);

  // Do counting sort for every digit.
  // Note that instead of passing
  // digit number, exp is passed.
  // exp is 10^i where i
  // is current digit number
  for (let exp = 1; maximumNumberOfDigits/exp > 0; exp*=10) {
    countSort(arr, exp);
  }
};

const getMax = (arr) => {
  let mx = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > mx) {
      mx = arr[i];
    }
  }

  return mx;
}

const countSort = (arr, exp) => {
  let output = [];
  let i;
  let count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // console.log("IN PROCESS OF SORTING ARR IS: ", arr);
  // Store count of occurrences in count
  for (i = 0; i < arr.length; i++) {
    count[Math.floor(arr[i]/exp)%10]++;
  }

  // Change count[i] so that count[i]
  // now contains actual position of
  // this digit in output
  for (i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  // Build the output array
  for (i = arr.length - 1; i >= 0; i--) {
    output[count[Math.floor(arr[i]/exp) % 10] - 1] = arr[i];
    count[Math.floor(arr[i]/exp)%10]--;
  }

  // Copy the output array to arr,
  // so that arr now contains sorted
  // numbers according to current digit
  for (i = 0; i < arr.length; i++) {
    arr[i] = output[i];
  }
}

let arr = [170, 45, 75, 90, 802, 24, 2, 66];
console.log("ARR PRIOR TO SORTING IS: ", arr);
radixSort(arr);
console.log("ARR SORTED IS: ", arr);
