/**
 * @param {string} str1
 * @param {string} str2
 * @return {boolean}
 */
 var canConvert = function(s1, s2) {
  let map = {};
  if (s1.length !== s2.length) return false;
  if (s1 === s2) return true;

  for (let i = 0; i < s1.length; i++) {
      if (!map[s1[i]]) {
          map[s1[i]] = s2[i];
      } else if(map[s1[i]] !== s2[i]) {
          return false;
      }
  }

  return 26 != new Set(Object.values(map)).size;
};