const findSmallest = (arr) => {
  let result = 1;

  for (let i = 0; i < arr.length && arr[i] <= result; i++) {
    result = result + arr[i];
  }

  return result;
}


let arr = [1, 2, 6, 10, 11, 15];
// 4 is the smallest positive
// integer value that cannot be
// represented as sum of elements
// of any subset of given set.
console.log(findSmallest(arr))
