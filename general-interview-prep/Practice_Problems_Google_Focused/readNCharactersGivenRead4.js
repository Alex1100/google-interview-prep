/**
 * Definition for read4()
 *
 * @param {character[]} buf Destination buffer
 * @return {number} The number of characters read
 * read4 = function(buf) {
 *     ...
 * };
 */

/**
 * @param {function} read4()
 * @return {function}
 */
const solution = function(read4) {
  let internalBuf = [];

  /**
   * @param {character[]} buf Destination buffer
   * @param {number} n Maximum number of characters to read
   * @return {number} The number of characters read
   */

  return function(buf = a, n = b) {
      let readChars = 0;
      while(n>0) {
        if(internalBuf.length === 0) {
          if(read4(internalBuf) === 0) {
            return readChars;
          }
        }

        buf.push(internalBuf.shift());
        readChars++;
        n--;
      }

    return readChars;
  };
};

let buf = "abcdefghijklmnopqrst1234567890".split('');
let n = 11;

const read4 = (buf) => {
  let temp = 4;

  for (let i = 0; i < 4; i++) {
    if (buf[i]) {
      temp--;
    } else {
      return temp;
    }
  }

  return temp;
}

console.log(buf.slice(0, solution(read4, buf, n)(buf, n)).join(''));
