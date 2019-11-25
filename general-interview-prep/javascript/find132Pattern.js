/**
 * @param {number[]} nums
 * @return {boolean}
 */
var find132pattern = function(nums) {
    // use a stack

    // then pop off stack and
    // check base case

    let max = -Infinity;
    let stack = [];

    for(let i = nums.length - 1; i >= 0; i--) {
        while(stack.length && stack[stack.length - 1] < nums[i]) {
            max = Math.max(max, stack[stack.length - 1]);
            stack.pop();
        }

        if(max !== -Infinity && max > nums[i] && stack.length) return true;

        if(!stack.length || (nums[i] < stack[stack.length - 1])) {
            stack.push(nums[i]);
        }
    }

    return false;
};
