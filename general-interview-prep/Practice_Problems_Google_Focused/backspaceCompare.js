/**
 * @param {string} S
 * @param {string} T
 * @return {boolean}
 */
var backspaceCompare = function(S, T) {
    let first = [];
    let second = [];

    for (let char of S) {
        if (char !== "#") {
            first.push(char);
        } else if (first.length !== 0) {
            first.pop();
        }
    }

    for (let char of T) {
        if (char !== "#") {
            second.push(char);
        } else if (second.length !== 0) {
            second.pop();
        }
    }

    while(first.length !== 0) {
        let current = first.pop();
        if (second.length === 0 || second.pop() !== current) {
            return false;
        }
    }

    return true;
};
