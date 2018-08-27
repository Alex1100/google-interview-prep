// Inputs: arr = [5, -4, -1], arr = [5, -5, -1]
// Outputs: true, false

const improvedIsCycle = (arr) => {
 let index = 0;

 for (let i = 0; i < arr.length; i++) {
   index = ((index + arr[index]) % arr.length + arr.length) % arr.length;

   if(index === 0 && i < arr.length - 1) {
     return false;
   }
 }

 return index === 0;
}

console.log(improvedIsCycle([5, -5, -1]))
console.log(improvedIsCycle([5, -4, -1]))

const isCycle = (arr) => {
  let current = arr[0];
  let start = arr[0];
  let visitedSet = new Set([start]);
  let currentIndex = 0;
  let counter = 0;
  // ask edge cases (empty array), (input doesn’t fit in memory)

  while(counter < arr.length + 1) {
    currentIndex = Math.abs(((currentIndex + current) % arr.length + arr.length) % arr.length);
    // ((0 + 5) % (3 + 3) % 3)
    // ((2 - 1) % (3 + 3) % 3)
    // ((1 - 4) % (3 + 3) % 3)

    if (current === start && visitedSet.size === arr.length) {
      return true
    }

    current = arr[currentIndex];

    if (current === start || !visitedSet.has(current)) {
      visitedSet.add(current);
      counter++;
    } else {
      return false;
    }
  }

  console.log(visitedSet, counter)
  return true;
}

console.log(isCycle([5, -5, -1]))
console.log(isCycle([5, -4, -1]))

console.log(Math.abs(((0 + 5) % (3 + 3) % 3)))
console.log(Math.abs(((2 - 1) % (3 + 3) % 3)))
console.log(Math.abs(((1 - 4) % (3 + 3) % 3)))
