const pushZerosToEnd = (arr, n) => {
    let count = 0;  // Count of non-zero elements

    // Traverse the array. If element encountered is
    // non-zero, then replace the element at index 'count'
    // with this element
    for (let i = 0; i < n; i++) {
        if (arr[i] != 0) {
            arr[count++] = arr[i]; // here count is incremented
        }
    }


    // Now all non-zero elements have been shifted to
    // front and 'count' is set as index of first 0.
    // Make all elements 0 from count to end.
    while (count < n) {
        arr[count++] = 0;
    }
}

const moveZeroes = (nums) => {
    pushZerosToEnd(nums, nums.length)
    console.log("YOO: ", nums)
};

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 var moveZeroes = function(nums) {
    let i = 0;
    for (let j = 0; j < nums.length; j++) {           
        if (nums[i] == 0 && nums[j] != 0) {
            nums[i] = nums[j];
            i++;
            nums[j] = 0;
        } else if (nums[i] != 0) {
            i++;
        }
    }
};