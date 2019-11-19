/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    if (strs.length <= 1) {
        return [strs];
    }

    let seen = {};
    strs.forEach(str => {
        let og = str;
        let s = str.split('');
        s.sort((a, b) => a > b);
        s = s.join('');
        if (!seen[s]) {
            seen[s] = [og];
        } else if (seen[s]) {
            seen[s].push(og);
        }
    });
    return Object.values(seen);
};
