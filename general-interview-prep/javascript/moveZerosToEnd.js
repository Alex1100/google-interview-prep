function moveZerosToEnd(arr) {
	/**
	@param arr: integer[]
	@return: integer[]
	*/

	// your code goes here

  let start = 0;
  let end = arr.length - 1;

  function swap(arr, curr, next) {
    let temp = arr[curr];
    arr[curr] = arr[next];
    arr[next] = temp;
  }

  if (arr.length <= 3) {
    return arr;
  }

  while(start < arr.length) {
    if (arr[start] === 0) {
      swap(arr, start, start + 1);
    }

    if (arr[end] === 0) {
      if (end - 1 !== start) {
        swap(arr, end - 1, end);
      }
    }


    if (start === end) {
      end = arr.length - 1;
    }

    start++;
    end--;
  }

  console.log('ARR IS: ', arr);
  return arr;
}
