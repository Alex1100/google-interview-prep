/**
 * @param {string} s
 * @return {number}
 */
const firstUniqChar = (s) => {
    const seen = {};
    if (!s) {
        return -1;
    }

    for (let i = 0; i < s.length; i++) {
        if (seen[s[i]] === undefined) {
            seen[s[i]] = s;
        } else if (seen[s[i]]) {
            seen[s[i]] = 0;
        }
    }

    for (let i = 0; i < s.length; i++) {
        if (seen[s[i]]) {
            return i;
        }
    }

    return -1;
};
