/**
 * @param {string[]} sentence
 * @param {number} rows
 * @param {number} cols
 * @return {number}
 */
const wordsTyping = (sentence, rows, cols) => {
  let all = '';
  // all = the whole sentence with spce in between and in the end
  for (let j = 0; j < sentence.length; j++) {
    all = all.concat(sentence[j] + ' ');
  }

  let start = 0, len = all.length;
  // loop the row, try to take one col at one time, if all[start % len] = ' ', move on
  for (let i = 0; i < rows; i++) {
    start += cols;
    if (all[start % len] === ' ') {
      start++;
    } else {
      // otherwise, start-- until there is a space
      while (start > 0 && all[(start - 1) % len] !== ' ') {
        start--;
      }
    }
  }

  return parseInt(start / len);
};
