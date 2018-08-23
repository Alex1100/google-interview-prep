/**
 * @param {number[]} digits
 * @return {number[]}
 */
const plusOne = (digits) => {
  let result = [];
  let carry = 1;
  let total;

  for (let i = digits.length - 1; i >= 0; i--) {
    total = digits[i] + carry;

    if (total === 10) {
      carry = 1;
    } else {
      carry = 0;
    }

    result[i] = total % 10;
  }

  if (carry) {
    result = [1, ...result];
  }

  return result;
};
