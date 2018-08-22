/**
 * @param {number} x
 * @return {number}
 */
const mySqrt = (x) => {
    let lo = 0;
    let hi = x;
    while(lo <= hi) {
         let mid = Math.floor((lo + hi) / 2);
         if(mid * mid > x) {
             hi = mid - 1;
        } else {
             lo = mid + 1;
        }
    }
    return hi;
}
