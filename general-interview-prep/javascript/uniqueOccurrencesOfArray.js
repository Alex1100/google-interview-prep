/**
 * @param {number[]} arr
 * @return {boolean}
 */
 var uniqueOccurrences = function(arr) {
  let seen = {};
  for (let i = 0; i < arr.length; i++) {
      seen[arr[i]] === undefined ? seen[arr[i]] = 1 : seen[arr[i]]++;
  }
  
  let count = {};
  for (let key in seen) {
      let numOccurrence = seen[key];
      if (Object.values(count).includes(numOccurrence)) {
          return false;
      }
      count[key] = numOccurrence;
  }
  
  return true;
};