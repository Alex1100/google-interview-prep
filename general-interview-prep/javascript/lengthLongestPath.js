/**
 * @param {string} input
 * @return {number}
 */
 var lengthLongestPath = function(input) {
  let max = 0;
  let local = [];
  
  for (let line of input.split('\n')) {
    const depth = line.lastIndexOf('\t') + 1;
    local[depth] = (local[depth - 1] || 0) + line.length - depth;
    if (line.indexOf('.') > -1) max = Math.max(max, local[depth] + depth);
  }
  
  return max;
};