/**
 * @param {string} S
 * @return {string}
 */
var reverseOnlyLetters = function(S) {
    let reg = new RegExp(/^[A-Za-z]+$/);
    let output = "";
    let i = S.length - 1;

    for (let c of S) {
        if (reg.test(c)) {
            let temp = S[i];
            while(!reg.test(temp)) {
                i--;
                temp = S[i];
            }
            i--;
            output += temp;
        } else {
            output += c;
        }
    }

    return output;
};
