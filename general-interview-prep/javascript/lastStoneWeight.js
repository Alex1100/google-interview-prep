/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function(stones) {
    const len = stones.length;
    if(len === 1) return stones;
    stones.sort((a,b) => a-b);
    const last = stones[len - 1];
    const secToLast = stones[len-2];
    return lastStoneWeight(stones.slice(0,stones.length-2).concat(last-secToLast));
};
