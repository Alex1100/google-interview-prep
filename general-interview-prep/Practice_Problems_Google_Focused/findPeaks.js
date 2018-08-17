/*
In this challenge, you will write a function that returns the positions and the values of the "peaks" (or local maxima) of a numeric array.

For example, the array arr = [0, 1, 2, 5, 1, 0] has a peak at position 3 with a value of 5 (since arr[3] equals 5).

The output will be returned as an object with two properties: positions and peaks. Both of these properties should be arrays. If there is no peak in the given array, then the output should be {positions: [], peaks: []}.

Example: findPeaks([3, 2, 3, 6, 4, 1, 2, 3, 2, 1, 2, 3]) should return {positions: [3, 7], peaks: [6, 3]} (or equivalent in other languages)

All input arrays will be valid integer arrays (although it could still be empty), so you won't need to validate the input.

The first and last elements of the array will not be considered as peaks (in the context of a mathematical function, we don't know what is after and before and therefore, we don't know if it is a peak or not).

Also, beware of plateaus !!! [1, 2, 2, 2, 1] has a peak while [1, 2, 2, 2, 3] does not. In case of a plateau-peak, please only return the position and value of the beginning of the plateau. For example: findPeaks([1, 2, 2, 2, 1]) returns {positions: [1], peaks: [2]} (or equivalent in other languages)
*/


function findPeaks(terrain) {
  const result = {
    positions: [],
    peaks: []
  };

  if (terrain.length > 2) {
    let position = -1;
    for (let i = 1; i < terrain.length; i++) {
      if (terrain[i] > terrain[i - 1]) {
        position = i;
      } else if (terrain[i] < terrain[i - 1] && position != -1) {
        result.positions.push(position);
        result.peaks.push(terrain[position]);
        position = -1;
      }
    }
  }

  return result
}

let terrain1 = [3, 2, 3, 6, 4, 1, 2, 3, 2, 1, 2, 3]
let terrain2 = [25, 8, 15, 5, 6, 10, 10, 3, 1, 20, 7]

console.log(findPeaks(terrain1));
console.log("\n\n", findPeaks(terrain2));
console.log("\n\n", findPeaks([1, 2, 2, 2, 3]));



