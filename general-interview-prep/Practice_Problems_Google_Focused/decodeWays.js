/**
 * @param {string} s
 * @return {number}
 */

const numDecodings = (s) => {
    if(!s || s[0] === '0') {
        return 0;
    }

    let nums = [1, 1];

    for(var i = 2; i <= s.length; i++) {
        let tmp;

        tmp = parseInt(s.substring(i - 1, i));

        if(tmp === 0) {
            nums[i] = 0;
        } else {
            nums[i] = nums[i-1];
        }

        if(s[i - 2] !== '0') {
            tmp = parseInt(s.substring(i - 2, i));

            if(0 < tmp && tmp <= 26) {
                nums[i] += nums[i - 2];
            }
        }
    }

    return nums[s.length];
};
