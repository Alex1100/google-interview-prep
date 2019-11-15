/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const seen = {};

    for (let i = 0; i < nums.length; ++i) {
        if (seen[target - nums[i]] === undefined) {
            seen[target - nums[i]] = i;
        }

        if (seen[nums[i]] !== undefined && seen[nums[i]] !== i) {
            return [seen[nums[i]], i];
        }
    }

    return [];
};
