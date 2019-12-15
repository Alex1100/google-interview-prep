/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function(version1, version2) {
    let v1 = version1.split('.');
    let v2 = version2.split('.');

    if (v1.length < v2.length) {
        let diff = v2.length - v1.length;
        while(diff !== 0) {
            v1.push("0");
            diff--;
        }
    } else if (v2.length < v1.length) {
        let diff = v1.length - v2.length;
        while(diff !== 0) {
            v2.push("0");
            diff--;
        }
    }


    for (let i = 0; i < v1.length; i++) {
        if (+v1[i] < +v2[i]) {
            return -1;
        }

        if (+v1[i] > +v2[i]) {
            return 1;
        }

    }

    return 0;
};
