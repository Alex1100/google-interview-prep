/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

const isOneEditDistance = (s, t) => {
    // Find lengths of given strings
    let m = s.length;
    let n = t.length;

    // If difference between lengths is more than 1,
    // then strings can't be at one distance
    if (Math.abs(m - n) > 1) {
        return false;
    }

    // Count of isEditDistanceOne
    let count = 0;

    let i = 0;
    let j = 0;
    while (i < m && j < n) {
        // If current characters dont match
        if(s[i] != t[j]) {
            if (count == 1) {
                return false
            }

            // If length of one string is
            // more, then only possible edit
            // is to remove a character
            if (m > n) {
                i+=1
            } else if (m < n) {
                j+=1
            } else {
                // If lengths of both strings is same
                i+=1
                j+=1
            }

            // Increment count of edits
            count+=1

        } else {
            // if current characters match
            i+=1
            j+=1
        }
    }
    // if last character is extra in any string
    if (i < m || j < n) {
        count+=1
    }

    return count == 1
};
