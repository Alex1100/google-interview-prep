/**
 * @param {number[]} calories
 * @param {number} k
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
var dietPlanPerformance = function(calories, k, lower, upper) {
    let sum = calories.slice(0, k).reduce((a, b) => a + b, 0);
    let ans = 0;
    for (let j = k-1; ; ) {
        if (sum < lower) --ans;
        if (sum > upper) ++ans;
        if (++j >= calories.length)
            break;
        sum -= calories[j-k];
        sum += calories[j];
    }
    return ans;
};
