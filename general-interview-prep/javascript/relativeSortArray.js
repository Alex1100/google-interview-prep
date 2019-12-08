/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
var relativeSortArray = function(arr1, arr2) {
    // keep track of count of each item that is found in arr1 that is also in arr2
    // then keep track of only those items which do not have colocation in both
    // append the sorted partition which was not found in the second array
    // and return concatenated result

    let included = {};
    let unincluded = {};

    arr1.forEach(num => {
        if (arr2.includes(num)) {
            if (included[num] === undefined) {
                included[num] = 1;
            } else {
                included[num]++;
            }
        }
    });

    arr1.forEach(num => {
        if (!arr2.includes(num)) {
            if (unincluded[num] === undefined) {
                unincluded[num] = 1;
            } else {
                unincluded[num]++;
            }
        }
    });

    let firstPartition = [];
    let secondPartition = [];

    for (let i = 0; i < arr2.length; i++) {
        while(included[arr2[i]] !== 0) {
            firstPartition.push(arr2[i]);
            included[arr2[i]]--;
        }
    }

    for (let key in unincluded) {
        while(unincluded[key] !== 0) {
            secondPartition.push(key);
            unincluded[key]--;
        }
    }

    secondPartition.sort((a, b) => a - b);
    return [...firstPartition, ...secondPartition];
};
