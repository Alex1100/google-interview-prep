/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
    const romanMap ={
        1000:'M',
        900:'CM',
        500:'D',
        400:'CD',
        100:'C',
        90:'XC',
        50:'L',
        40:'XL',
        10:'X',
        9:'IX',
        5:'V',
        4:'IV',
        1:'I',
    }
    let result = '' // roman numbers must be represented as string
    // step 2
    let nums =  Object.keys(romanMap).sort((a,b)=>b-a)

    //step 3
    for(let i=0; i<nums.length; i++){
        let temp = nums[i]

        // step 4
        while(temp <= num) {
          num -= temp
          result += romanMap[temp];
        }

        // step 5
        if(temp <=0) break
    }
    // step 6
    return result
};
