/**
 * @param {number[][]} dominoes
 * @return {number}
 */
var numEquivDominoPairs = function(dominoes) {
	let res = 0;
	let hash = {}

	for (let dominoe of dominoes) {
		if (dominoe[0] > dominoe[1]) {
			let temp = dominoe[1];
            dominoe[1] = dominoe[0];
            dominoe[0] = temp;
		}

		let tmp = [dominoe[0], dominoe[1]];
        if (hash[tmp]) {
            if (hash[tmp] > 0) {
                res += hash[tmp]
            }
        }

        if (hash[tmp] === undefined) {
            hash[tmp] = 1;
        } else {
            hash[tmp]++;
        }
	}

	return res
};
