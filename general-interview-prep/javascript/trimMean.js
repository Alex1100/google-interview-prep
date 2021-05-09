/**
 * @param {number[]} arr
 * @return {number}
 */
 var trimMean = function(arr) {
  arr.sort((a, b) => a - b);
  let x = Math.floor(arr.length * 0.05);
  let z = arr.slice(x, arr.length - x);
  return z.reduce((a, b) => a + b, 0)/z.length
};