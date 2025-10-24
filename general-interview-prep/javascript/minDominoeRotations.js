/**
 * @param {number[]} tops
 * @param {number[]} bottoms
 * @return {number}
 */


 const findMinRotations = (target, arr1, arr2) => {
  let steps = 0;
  for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== target && arr2[i] !== target) {
          return Infinity;
      } else if (arr1[i] !== target) {
          steps++;
      }
  }
  
  return steps;
};

var minDominoRotations = function(tops, bottoms) {
  let minRotations = Infinity;
  
  // top of a rotate with bottom b
  minRotations = Math.min(minRotations, findMinRotations(tops[0], tops, bottoms));
  // top of b rotate with bottom b
  minRotations = Math.min(minRotations, findMinRotations(bottoms[0], tops, bottoms));
  // bottom of a rotate wit top of b
  minRotations = Math.min(minRotations, findMinRotations(tops[0], bottoms, tops));
  // bottom of b rotate with top of a
  minRotations = Math.min(minRotations, findMinRotations(bottoms[0], bottoms, tops));
  
  return minRotations === Infinity ? -1 : minRotations;
};