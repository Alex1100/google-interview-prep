/**
 * @param {string} s
 * @return {boolean}
 */

// FB

 var validPalindrome = (s) => {
  let l = 0, r = s.length - 1;
  while (l < r) {
      if (s[l++] != s[r--]) {
          return isPalindrome(s, l - 1, r) || isPalindrome(s, l, r + 1);
      }
  }
  return true;
};

var isPalindrome = (s, l, r) => {
  while (l < r)
      if (s[l++] != s[r--])
          return false;
  return true;
};