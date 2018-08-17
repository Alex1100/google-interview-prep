// Sliding Window Concept

function longestSubstring(str) {
  let hash = {};
  let maxResult = 0;
  let start = 0;
  let end = 0;
  let res = '';

  while (end < str.length) {
    // if the letter already exists
    if (hash.hasOwnProperty(str[end])) {
      // check if letter is IN window
      if (hash[str[end]] >= start) {
        // if yes, move start to the right (one past previous time letter appeared)
        start = hash[str[end]] + 1;
      }
    }

    // if window is bigger than previous window, update max result
    maxResult = Math.max(maxResult, end - start + 1)
    res = str.slice(start, end);

    // store or update the index of the end letter in hash table
    hash[str[end]] = end;

    end++;
  }

  return res
}

console.log(longestSubstring('abbcdakdkfnalkcds'))
console.log(longestSubstring('abbcdakdkfnalkcds').length)
