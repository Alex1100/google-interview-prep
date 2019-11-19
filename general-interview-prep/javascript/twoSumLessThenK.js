var twoSumLessThanK = function(A, K) {
    let closestSum = -1

    A.sort((a, b)=> a - b)

    let left = 0;
    let right = A.length - 1;

    while(left < right) {
        let sum = A[left] + A[right]

        if(sum === K - 1) {
            closestSum = sum;
            break
        }

        if(sum > closestSum && sum < K) {
            closestSum = sum
        }

        sum > K ? right-- : left++
    }

    return closestSum
};


/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var twoSumLessThanK = function(A, K) {
    let ans = -1;
    let l = 0;
    let r = A.length - 1;
    A.sort((a, b) => a - b);

    while(l < r) {
        if (A[l] + A[r] >= K) {
            r--;
        } else {
            ans = Math.max(ans, A[l] + A[r]);
            l++;
        }
    }

    return ans;
};
