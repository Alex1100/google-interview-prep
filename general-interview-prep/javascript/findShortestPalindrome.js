const shortestPalindrome = (s) => {
  let left = 0;

  for (let i = s.length - 1; i >= 0; i--) {
    if (s[left] === s[i]) {
      left++;
    }
  }

  if (left === s.length) {
    return s;
  }

  const subfix = s.substring(left);
  const prefix = subfix.split("").reverse().join("");
  const mid = shortestPalindrome(s.substring(0, left));

  return `${prefix}${mid}${subfix}`;
};
