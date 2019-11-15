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
