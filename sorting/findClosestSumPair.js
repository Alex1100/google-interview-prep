const closestSumPair = (arr, sum) => {
  let seen = {};
  let left = 0;
  let right = arr.length - 1;
  let diff = Infinity;
  let tempLeft;
  let tempRight;

  while(right > left) {
    if (Math.abs(arr[left] + arr[right] - sum) < diff) {
      tempLeft = left;
      tempRight = right;
      diff = Math.abs(arr[left] + arr[right] - sum);
    }

    if (diff === 0) {
      return [arr[tempLeft], arr[tempRight]]
    }

    if (arr[left] + arr[right] > sum) {
      right--;
    } else if (arr[left] + arr[right] < sum) {
      left++;
    }
  }

  return [arr[tempLeft], arr[tempRight]];
}

let a = [1, 2, 3, 4, 5];
console.log(closestSumPair(a, 5))
