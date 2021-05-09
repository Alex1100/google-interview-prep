/*
 * Given a non-empty array of digits representing a non-negative integer, plus one to the integer.
 *
 * The digits are stored such that the most significant digit is at the head of the list, and each element in the array contain a single digit.
 *
 * You may assume the integer does not contain any leading zero, except the number 0 itself.
 *
 * Example 1:
 *
 * Input: [1,2,3]
 * Output: [1,2,4]
 * Explanation: The array represents the integer 123.
 * Example 2:
 *
 * Input: [4,3,2,1]
 * Output: [4,3,2,2]
 * Explanation: The array represents the integer 4321.
**/

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

/**
 * @param {number[]} digits
 * @return {number[]}
 */
 var plusOne = function(digits) {
  let carry = 0;
  let plus = 1;
  let result = [];
  for (let i = digits.length - 1; i >= 0; i--) {
      let newCurr = digits[i] + plus + carry;
      plus = 0;
      carry = 0
      if (newCurr > 9) {
          carry = 1;
          newCurr = 0;
      }
      result.push(newCurr);
  }
  
  if (carry) {
      result.push(1);
  }
  return result.reverse();
};
