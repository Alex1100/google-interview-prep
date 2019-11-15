/**
 * @param {string[]} logs
 * @return {string[]}
 */
var reorderLogFiles = function(logs) {
    const regexAlpha = /[A-Za-z]/;
    const alphaTest = new RegExp(regexAlpha, "i");
    let alphaLogs = [];
    let digiLogs = [];

    logs.forEach(log => {
        if (alphaTest.test(log.split(' ').slice(1).join(''))) {
            alphaLogs.push(log);
        } else {
            digiLogs.push(log);
        }
    });

    alphaLogs.sort((a, b) => {
        if (a.split(' ').slice(1) < b.split(' ').slice(1)) {
            return -1
        } else {
            return 1;
        }
    });

    return [...alphaLogs, ...digiLogs];
};
