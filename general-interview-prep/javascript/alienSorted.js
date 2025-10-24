/**
 * @param {string[]} words
 * @param {string} order
 * @return {boolean}
 */
 var isAlienSorted = function(words, order) {
  const m = {};
  for (let i = 0; i < order.length; ++i) m[order[i]] = i;
  
  const isLTE = (a, b) => {
    for (let i = 0; i < Math.min(a.length, b.length); ++i) {
      if (m[a[i]] < m[b[i]]) return true;
      if (m[a[i]] > m[b[i]]) return false;
    }
    return a.length <= b.length;
  }

  for (let i = 0; i < words.length - 1; ++i) {
    if (!isLTE(words[i], words[i+1])) return false;
  }
  return true;
};