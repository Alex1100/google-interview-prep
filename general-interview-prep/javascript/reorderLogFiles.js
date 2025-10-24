/**
 * @param {string[]} logs
 * @return {string[]}
 */
 var reorderLogFiles = function(logs) {
    let [digits, letters] = [[], []];

    for(let i = 0; i < logs.length; i++) {
        const str = logs[i].slice(logs[i].indexOf(' ') + 1);
        if(str.slice(0,1).match(/[a-z]/i)) {
            letters.push(logs[i]);
        } else {
            digits.push(logs[i]);
        }
    }


    const sortedLets = letters.sort((a,b) => {
        const idA = a.split(" ",1);
        const idB = b.split(" ",1);
        const contentA = a.split(/^[^\s]*\s/);
        const contentB = b.split(/^[^\s]*\s/)

        if(contentA[1] !== contentB[1]) return contentA[1].localeCompare(contentB[1]); 
        else return idA[0].localeCompare(idB[0]); 

    });
    sortedLets.push(...digits);
    return sortedLets;
};