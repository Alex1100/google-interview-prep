/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function(s, t) {
    let tmp = [];
    let counterIndex = 0;

    if (s === "") {
        return true;
    }

    t.split('').forEach((char, index) => {
        if (s.charCodeAt(counterIndex) == char.charCodeAt(0)) {
            tmp.push(true);
            counterIndex++;
        }
    })

    console.log('TMP: ', tmp);

    return tmp.length === s.length;
};
