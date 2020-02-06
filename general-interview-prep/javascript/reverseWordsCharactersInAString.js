/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    let left = 0;
    let right = s.length - 1;

    // remove leading spaces
    while (left <= right && s[left] === " ") {
        left += 1
    }

    // remove trailing spaces
    while(left <= right && s[right] === " ") {
        right -= 1
    }

    let d = [];
    let word = [];

    // push word by word in front of deque
    while(left <= right) {
        if (s[left] === " " && word.length !== 0) {
            d = [...d, word.reverse().join("")];
            word = [];
        } else if (s[left] !== " ") {
            word.push(s[left]);
        }

        left += 1

    }
    d = [...d, word.reverse().join("")]
    return d.join(" ");
};
