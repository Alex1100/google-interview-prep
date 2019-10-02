/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */

var minWindow = function(s, t) {
    if(t.length > s.length) {
        return "";
    }

    var result = "";

    // character counter for t
    var target = {};
    for(var i = 0; i < t.length; i++) {
        var c = t.charAt(i);
        if(target[c] != null) {
            target[c] = target[c] + 1;
        } else {
            target[c] = 1;
        }
    }

    // character counter for s
    var map = {};
    var left = 0;
    var minLen = s.length+1;

    var count = 0; // the total of mapped characters

    for(var i = 0; i < s.length; i++) {
        var c = s.charAt(i);

        if(target[c] != null) {
            if(map[c] != null) {
                if(map[c] < target[c]) {
                    count++;
                }
                map[c] = map[c]+1;
            } else {
                map[c] = 1;
                count++;
            }
        }

        if(count === t.length) {
            var sc = s.charAt(left);
            while ((map[sc]==null) || map[sc] > target[sc]) {
                if (map[sc] != null && map[sc] > target[sc])
                    map[sc] = map[sc] - 1;
                left++;
                sc = s.charAt(left);
            }

            if (i - left + 1 < minLen) {
                result = s.substring(left, i + 1);
                minLen = i - left + 1;
            }
        }
    }

    return result;
};


/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    let min = Number.MAX_SAFE_INTEGER, end = 0, begin = 0, counter = t.length, head = 0;
    let map = {};
    for(let val of t){
        map[val] = ++map[val] || 1;
    }
    while(end < s.length){
        if(map[s[end++]]-- > 0) counter--;
        while(counter === 0){
            if(end-begin < min){
                head = begin;
                min = Math.min(min, end-begin);
            }
            if(map[s[begin++]]++ === 0) counter++;
        }
    }

    return min === Number.MAX_SAFE_INTEGER ? "" : s.substr(head, min);
};

//Reference: //Reference: https://leetcode.com/problems/minimum-window-substring/discuss/26808/Here-is-a-10-line-template-that-can-solve-most-'substring'-problems


minWindow("ABC", "ABDOCEBANC");
