/**
 * @param {string} digits
 * @return {string[]}
 */
const keys = [0, 1, "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];

const letterCombinations = (digits) => {
  const result = [];
  if (digits == null || digits.length == 0) return result;
  findCombinations("", digits, 0, result);
  return result;
};

// Depth first search
const findCombinations = (prefix, digits, offset, result) => {
  // each string in the result array will be of length `digits.length`
  if (offset >= digits.length) {
    result.push(prefix);
    return;
  }

  const charsOfDigit = keys[digits[offset]];
  for (let char of charsOfDigit) {
    findCombinations(prefix + char, digits, offset + 1, result);
  }
};
