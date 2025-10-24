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




/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function(version1, version2) {
    let version1Split = version1.split('.');
    let version2Split = version2.split('.');
    let version1IsGreater = undefined;
    let longerSplit = version2Split.length > version1Split.length ? version2Split : version1Split;
    let shorterSplit = version2Split.length > version1Split.length ? version1Split : version2Split;
    let versions = [];
    for (let i = 0; i < longerSplit.length; i++) {
        let currentLong = longerSplit[i];
        let currentShort = shorterSplit[i];
        if (currentShort === undefined) {
            currentShort = '0';
        }
        const {version1Res, version2Res} = compareVersionUtil(longerSplit === version1Split ? currentLong : currentShort, shorterSplit === version2Split ? currentShort : currentLong);
        versions.push([version1Res, version2Res]);
    }
    let allEqual = true;
    for (let i = 0; i < versions.length; i++) {
        if (versions[i][0] !== versions[i][1]) {
            allEqual = false;
        }
    }
    if (allEqual) {
        return 0;
    }
    for (let i = 0; i < versions.length; i++) {
        if (versions[i][0] < versions[i][1]) {
            return -1;
        } else if (versions[i][0] > versions[i][1]) {
            return 1;
        }
    }
    
    return 0;
};

const compareVersionUtil = (version1Split, version2Split) => {
    let version1IsGreater = false;
    let versionsAreEqual = false;
    let version1Res = 0;
    let version2Res = 0;
    let majorVersionSplit = version1Split.split('');
    let current = 0;

    while (majorVersionSplit[current] == 0 && current < majorVersionSplit.length - 1) {
        current++;
    }

    let majorVersionNumber = +majorVersionSplit.join('').substring(current, majorVersionSplit.length);

    let majorVersion2Split = version2Split.split('');
    let current2 = 0;
    while (majorVersion2Split[current2] == 0 && current2 < majorVersion2Split.length - 1) {
        current2++;
    }
    let majorVersion2Number = +majorVersion2Split.join('').substring(current2, majorVersion2Split.length);
    version1Res = majorVersionNumber;
    version2Res = majorVersion2Number;

    return {
        version1Res,
        version2Res,
    }
};