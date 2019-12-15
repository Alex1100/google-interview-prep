/**
 * @param {number} A
 * @param {number} B
 * @param {number} C
 * @param {number} D
 * @param {number} E
 * @param {number} F
 * @param {number} G
 * @param {number} H
 * @return {number}
 */
var computeArea = function(A, B, C, D, E, F, G, H) {
    let area1 = Math.abs((C-A) * (D-B));
    let area2 = Math.abs((G-E) * (H-F));
    let totalArea = area1 + area2;
    // if the highest minus y is greater then the smallest positive y
    // return 0
    let yOverlap = Math.max(B,F) > Math.min(D,H) ? 0 : Math.min(D,H) - Math.max(B, F);

    let xOverlap = Math.max(A,E) > Math.min(C,G) ? 0 : Math.min(C,G) - Math.max(A, E);

    return totalArea - (yOverlap * xOverlap);
};
