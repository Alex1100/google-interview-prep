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
        console.log("TEMP IS: ", tmp);

        if(tmp === 0) {
            nums[i] = 0;
        } else {
            nums[i] = nums[i-1];
        }

        console.log("NUMS IS: ", nums);

        if(s[i - 2] !== '0') {
            tmp = parseInt(s.substring(i - 2, i));
            console.log("NOW TMP IS: ", tmp);

            if(0 < tmp && tmp <= 26) {
                nums[i] += nums[i - 2];
            }
            console.log("NUMS IS NOW: ", nums);
            console.log("TEMP IS NOW: ", tmp);
            console.log("S IS NOW: ", s);
        }
    }

    return nums[s.length];
};
console.log(numDecodings("1234"));
console.log("\n\n", numDecodings("12392398"));
console.log("\n\n", numDecodings("1234567892345634232"));
