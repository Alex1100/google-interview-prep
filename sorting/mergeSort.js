// think of merge sort like a
// binary tree
//
// the merge function will only create
// a new array and push into it elements
// from a left sub array and a
// right sub array based off a
// certain condition
//
// the merge sort will push the element
// from the leftSubArray when
// the value of the current index
// of the leftSubArray is less
// than the value at the current index
// of the rightSubArray
//The inverse is also true
//
// it will only push the element
// from the rightSubArray's current Index
// when the element at the
// leftSubArray's current index is
// greater than the element at the
// rightSubArray's current Index

// once both the leftSubArray's
// current Index counter and
// the rightSubArray's current
// index counter are both
// larger than there respective
// subarrays
// then the merge function breaks
// it's while loop, and returns
// the newly created result Array
// that we were pushin items within it
// to.

// because of recursion the mergeSort
// function will do this same process
// by calling mergeSort which each
// call to mergeSort will have it's own
// call to merge for both the left and
// right subArrays from the previous
// mergeSort/merge function call
// until the left and right
// subArrays are equal and it will break;

const mergeSort = (arr) => {
  if (arr.length === 1) {
    return arr
  }

  const middle = Math.floor(arr.length / 2)
  const left = arr.slice(0, middle)
  const right = arr.slice(middle)
  console.log("MIDDLE IS: ", middle);
  return merge(
    mergeSort(left),
    mergeSort(right)
  )
}

const merge = (left, right) => {
  let result = []
  let indexLeft = 0
  let indexRight = 0

  while (indexLeft < left.length && indexRight < right.length) {
    if (left[indexLeft] < right[indexRight]) {
      result.push(left[indexLeft])
      indexLeft++
    } else {
      result.push(right[indexRight])
      indexRight++
    }
  }

  return [...result, ...left.slice(indexLeft), ...right.slice(indexRight)];
}




let arr = [1, 4, 3, 676, 34, 101, 6, 55];

console.log("BEFORE SORTING ARR IS: ", arr);
arr = mergeSort(arr);
console.log("AFTER SORTING ARR IS: ", arr);
