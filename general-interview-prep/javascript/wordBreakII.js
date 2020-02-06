/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */

var wordBreak = function(s, wordDict) {
    let memo = {};
    // returns list of sentence combinations given a index
    var recur = function(i) {
        if (memo[i]) return memo[i]
        if (i == s.length) {
            return [""];
        }

        let list = [];

        for (let end=i+1;end<=s.length;end++) {
            if (wordDict.includes(s.substring(i,end))) {
                let word = s.substring(i, end);
                let rest = recur(end);
                for (let comb of rest) {
                    list.push(word + (comb==""?"":" ") + comb);
                }
            }
        }
        memo[i] = list;
        return list;
    }
    return recur(0);
};
