/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    const counterPart = {
        "]": "[",
        "}": "{",
        ")": "("
    };

    if (s === "") {
        return true;
    }

    let stack = [];
    for (let i = 0; i < s.length; i++) {
        if (counterPart[s[i]] !== undefined) {
            if (counterPart[s[i]] === stack[stack.length - 1]) {
                stack.pop();
            } else {
                return false;
            }
        } else {
            stack.push(s[i]);
        }
    }
    if (stack.length === 0) {
        return true;
    }
    return false;
};
