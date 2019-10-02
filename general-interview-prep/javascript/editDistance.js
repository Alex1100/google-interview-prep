/*
 * Levenshtein Distance
**/


/**
 * @param {string} str1
 * @param {string} str2
 * @return {number}
 */
const minDistance = (str1, str2) => {
  let str1Len = str1.length;
  let str2Len = str2.length;
  let prevRow = [];
  let str2Char = [];

  // base cases
  if (str1Len === 0) return str2Len;
  if (str2Len === 0) return str1Len;

  // two rows
  let curCol, nextCol, tmp, i, j;

  // initialise previous row
  for (let i = 0; i < str2Len; ++i) {
    prevRow[i] = i;
    str2Char[i] = str2.charCodeAt(i);
  }

  prevRow[str2Len] = str2Len;

  let strCmp;
  // calculate current row distance from previous row without collator
  for (i = 0; i < str1Len; ++i) {
    nextCol = i + 1;

    for (j = 0; j < str2Len; ++j) {
      curCol = nextCol;

      // substution
      strCmp = str1.charCodeAt(i) === str2Char[j];
      nextCol = prevRow[j] + (strCmp ? 0 : 1);

      // insertion
      tmp = curCol + 1;
      if (nextCol > tmp) {
        nextCol = tmp;
      }

      // deletion
      tmp = prevRow[j + 1] + 1;
      if (nextCol > tmp) {
        nextCol = tmp;
      }

      // copy current col value into previous (in preparation for next iteration)
      prevRow[j] = curCol;
    }

    // copy last col value into previous (in preparation for next iteration)
    prevRow[j] = nextCol;
  }

  return nextCol;
}
