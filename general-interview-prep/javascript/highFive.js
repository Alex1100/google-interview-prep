/**
 * @param {number[][]} items
 * @return {number[][]}
 */
var highFive = function(items) {
    let scores = {};

    for (let item of items) {
        if (scores[item[0]] === undefined) {
            scores[item[0]] = [item[1]];
        } else {
            scores[item[0]].push(item[1]);
        }
    }

    let result = [];
    for (let key in scores) {
        let len = scores[key].length >= 5 ? 5 : scores[key].length;
        scores[key].sort((a, b) => b - a);
        let sum = scores[key].slice(0, len).reduce((acc, curr) => acc + curr, 0);
        let avg = Math.floor(sum / len);
        result.push([key, avg]);
    }

    return result;
};
