/*
  Ugly numbers are numbers whose only
  prime factors are 2, 3 or 5.
  The sequence
  [1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15]
  shows the first 11 ugly numbers.
  By convention, 1 is included.

  Given a number n, the task is to
  find n’th Ugly number.
*/

const getKthUglyNumber = (num) => {
  let ugly = []
  let i2 = 0;
  let i3 = 0;
  let i5 = 0;

  let next_multiple_of_2 = 2;
  let next_multiple_of_3 = 3;
  let next_multiple_of_5 = 5;

  let next_ugly_number = 1;

  ugly.push(next_ugly_number);

  for (let i = 1; i < num; i++) {
    next_ugly_number = Math.min(next_multiple_of_2, Math.min(next_multiple_of_3, next_multiple_of_5));

    ugly.push(next_ugly_number);

    if (ugly[i] === next_multiple_of_2) {
      i2++;
      next_multiple_of_2 = ugly[i2] * 2;
    }

    if (ugly[i] === next_multiple_of_3) {
      i3++;
      next_multiple_of_3 = ugly[i3] * 3;
    }

    if (ugly[i] === next_multiple_of_5) {
      i5++;
      next_multiple_of_5 = ugly[i5] * 5;
    }
  }

  return next_ugly_number;
}


console.log(getKthUglyNumber(150));
