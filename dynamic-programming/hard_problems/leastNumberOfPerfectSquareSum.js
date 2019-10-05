/*
 *  Given a positive integer n, find the least number of perfect square numbers (for example, 1, 4, 9, 16, ...) which sum to n.
 *
 *  Example 1:
 *
 *  Input: n = 12
 *  Output: 3
 *  Explanation: 12 = 4 + 4 + 4.
 *  Example 2:
 *
 *  Input: n = 13
 *  Output: 2
 *  Explanation: 13 = 4 + 9.
 */

/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {
    if (n <= 3)  {
        return n;
    }

    // Create a dynamic programming table
    // to store sq
    let dp = [];

    // getMinSquares table for base case entries
    dp[0] = 0;
    dp[1] = 1;
    dp[2] = 2;
    dp[3] = 3;

    // getMinSquares rest of the table using recursive
    // formula
    for (let i = 4; i <= n; i++) {
        // max value is i as i can always be represented
        // as 1*1 + 1*1 + ...
        dp[i] = i;

        // Go through all smaller numbers to
        // to recursively find minimum
        for (let x = 1; x <= Math.ceil(Math.sqrt(i)); x++) {
            let temp = x * x;
            if (temp > i) break;
            else dp[i] = Math.min(dp[i], 1 + dp[i - temp]);
        }
    }

    // Store result and free dp[]
    res = dp[n];
    return res;
};
