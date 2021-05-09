  /**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var lengthOfLongestSubstringKDistinct = function(s, k) {
  let left = 0;
  let distinctCount = 0;
  let tempStr = "";
  let hashMap = {}
  let maxLength = 0;
  
  while (left < s.length) {
      for (let i = left; i < s.length && distinctCount <= k; i++) {
          if (!hashMap[s[i]]) {
              hashMap[s[i]] = 1;
              distinctCount++;
          } 
          
          if (distinctCount <= k) {
              tempStr += s[i]
          }
      }
      maxLength = Math.max(maxLength, tempStr.length);
      tempStr = "";
      distinctCount = 0;
      hashMap = {};
      left++;
  }
  
  return maxLength;
};