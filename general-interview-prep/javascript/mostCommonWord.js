/**
 * @param {string} paragraph
 * @param {string[]} banned
 * @return {string}
 */
var mostCommonWord = function(paragraph, banned) {
    const seen = {};
    paragraph.split(/\W+/).forEach(word => {
        let w = word.toLowerCase();
        if (
            w.includes(".")
            || w.includes("!")
            || w.includes("?")
            || w.includes(",")
        ) {
            w = w.slice(0, w.length - 1);
        }

        if (!banned.includes(w)) {
            if (seen[w] === undefined) {
                seen[w] = 1;
            } else {
                ++seen[w];
            }
        }
    });

    let result = Object.entries(seen);
    result.sort((a, b) => a[1] < b[1])
    return result[0][0];
};
