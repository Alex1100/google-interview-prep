/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let maxP = 0;

    prices.forEach((price, i) => {
        if (i < prices.length - 1) {
            if (prices[i + 1] > price) {
                let curr = i + 1
                while (curr !== prices.length) {
                    if (prices[i] < prices[curr] && maxP < (prices[curr] - prices[i])) {
                        maxP = prices[curr] - prices[i]
                    }
                    curr++;
                }
            }
        }
    })

    return maxP;
};
