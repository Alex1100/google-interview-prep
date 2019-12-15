/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
    let answer = Array(num1.length + num2.length ).fill(0);
    let res = "";

    for(let i = num1.length - 1; i >= 0; i--) {
        for(let j = num2.length-1; j >= 0; j--) {
            let mul = +num1[i] * +num2[j];
            let p1 = i + j
            let p2 = i + j + 1
            let sum = mul + answer[p2]
            answer[p1] += Math.floor(sum/10)
            answer[p2] = sum % 10
        }
    }

    for(let p of answer) {
        if(!(res.length === 0 && p === 0)) {
            res += p;
        }
    }

    return res.length === 0 ? "0" : res
};
