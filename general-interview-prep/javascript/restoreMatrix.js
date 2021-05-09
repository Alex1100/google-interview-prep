/**
 * @param {number[]} rowSum
 * @param {number[]} colSum
 * @return {number[][]}
 */
 const restoreMatrix = (rowSum, colSum) => {
  
  const n = rowSum.length, m = colSum.length;
  
  // generate 2D Matrix filled with 0's
  const matrix = Array.from({ length: n }, () => new Array(m).fill(0));
  
  for(let i = 0; i < n; i++){
    for(let j = 0; j < m; j++){
      let val = Math.min(rowSum[i], colSum[j]);
      matrix[i][j] = val;
      rowSum[i] -= val;
      colSum[j] -= val;
    }
  }
  return matrix;
};