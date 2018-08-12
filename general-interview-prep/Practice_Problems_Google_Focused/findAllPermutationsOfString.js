// Recursive with generators
function *permute(a, n = a.length) {
  if (n <= 1) {
    yield a.slice();
  } else for (let i = 0; i < n; i++) {
    yield *permute(a, n - 1);
    const j = n % 2 ? 0 : i;
    [a[n-1], a[j]] = [a[j], a[n-1]];
  }
}

console.log(Array.from(permute("abc".split(''))).map(perm => perm.join('')));

// Recursive without generators
function permut(string) {
  if (string.length < 2) return string; // This is our break condition

  let permutations = []; // This array will hold our permutations

  for (let i=0; i<string.length; i++) {
    let char = string[i];

    // Cause we don't want any duplicates:
    if (string.indexOf(char) != i) {// if char was used already
      continue;           // skip it this time
    }
    let remainingString = string.slice(0,i) + string.slice(i+1,string.length); //Note: you can concat Strings via '+' in JS

    for (let subPermutation of permut(remainingString)) {
      permutations.push(char + subPermutation)
    }

  }

  return permutations;
}

console.log(permut('abc'))
