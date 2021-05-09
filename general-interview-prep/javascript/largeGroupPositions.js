/**
 * @param {string} s
 * @return {number[][]}
 */
 var largeGroupPositions = function(s) {
  let groups = {};
  let slow = 0;
  let fast = 0;
  let result = [];
  
  while (slow < s.length) {
      let current = s[slow];
      let currentCount = 0;
      while (fast < s.length && current === s[fast]) {
          if (!groups[current] && currentCount >= 3) {
              groups[current] = current;
          } else if (currentCount >= 3) {
              groups[current] += current;
          } else {
              currentCount++;
          }
          fast++;
      }
      if (currentCount >= 3) {
          result.push([slow, fast - 1]);
      }

      slow++;
  }
  
  return result;
};