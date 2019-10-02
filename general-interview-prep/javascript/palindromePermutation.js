/*
 * Given a string, write a function to check if it is a permutation of a palindrome.
 * A palindrome is a word that si the same forwards and backwards. A permutation
 * is a rearrangement of letters. The palindrome does not need to be limited
 * to just dictionary words
 * Example:
 *
 * Input: Tact Coa
 * Output True (permutations: "taco cat", "atco cta", etc...)
 */


 const palindromePermutation = (input) => {
  if (input.length < 2) {
    return input;
  }

  if (input.includes(' ')) {
    input = input.replace(/\s/g, '');
  }

  if (/[A-Z]/.test(input)) {
    input = input.split('').map(el => el.toLowerCase()).join('');
  }

  let permutations = [];

  for (let i = 0; i < input.length; i++) {
    let char = input[i];

    if (input.indexOf(char) !== i) {
      continue;
    }

    let remainingString = input.slice(0, i) + input.slice(i + 1, input.length);
    for (let subPermutation of palindromePermutation(remainingString)) {
      permutations.push(char + subPermutation);
    }
  }
  return permutations;
 }

 // jumps from 2 repeating chars and one solo === 0
 // jumps from 3 repeating chars and one solo === 6
 // jumps from 4 repeating chars and one solo === 24
 // jumps from 5 repeating chars and one solo === 120
 console.log(palindromePermutation('rort').filter(el => el === el.split('').reverse().join('')));
 console.log(palindromePermutation('taco cat').filter(el => el === el.split('').reverse().join('')));
 console.log(palindromePermutation('Abra Cdb Cr').filter(el => el === el.split('').reverse().join('')));
 console.log(palindromePermutation('Abra Cdb Crzz').filter(el => el === el.split('').reverse().join('')));

