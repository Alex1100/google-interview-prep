// Google

/**
 * @param {string} num
 * @return {boolean}
 */
 var isStrobogrammatic = function(num) {
  let length = num.length;
  for (let i = 0; i < length; i++) {
      switch (num.charCodeAt(i) - 48) {
          case 2:
              return false;
          case 3:
              return false;
          case 4:
              return false;
          case 5:
              return false;
          case 7:
              return false;
          case 6:
              if (9 !== num.charCodeAt(length - 1 - i) - 48) {
                  return false;
              }
              break;
          case 9:
              if (6 !== num.charCodeAt(length - 1 - i) - 48) {
                  return false;
              }
              break;
          case 1:
              if (num[i] !== num[length - 1 - i]) {
                  return false;
              }
              break;
          case 8:
              if (num[i] !== num[length - 1 - i]) {
                  return false;
              }
              break;
          case 0:
              if (num[i] !== num[length - 1 - i]) {
                  return false;
              }
              break;
      }
  }
  return true;
};