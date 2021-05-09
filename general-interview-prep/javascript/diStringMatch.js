// FB

/**
 * @param {string} s
 * @return {number[]}
 */
 var diStringMatch = function(s) {
  let i = 0, j = s.length;
  let res = [];
  s.split("").forEach(x => {
      if (x == 'I') {
          res.push(i);
          i++;
      } else {
          res.push(j);
          j--;
      }
  });
  res.push(i);
  return res;
};