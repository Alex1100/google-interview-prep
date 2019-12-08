/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

const missingCount = (nums, idx) => {
    return nums[idx] - nums[0] - idx;
}

var missingElement = function(nums, k) {
    let left = 0;
    let right = nums.length-1;
    let count = missingCount(nums, right);

    if(k > count) {
        return nums[right] + k - count;
    }

    while(left < right) {
        let mid = Math.floor(left + (right - left) / 2) ;
        count = missingCount(nums, mid);
        if(count >= k){
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return nums[left-1] + k - missingCount(nums, left-1);
};
