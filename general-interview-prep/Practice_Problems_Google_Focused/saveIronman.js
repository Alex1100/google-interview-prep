/*
  Jarvis is weak in computing palindromes for Alphanumeric characters.
  While Ironman is busy fighting Thanos, he needs to activate sonic punch but Jarvis is stuck in computing palindromes.
  You are given a string containing the alphanumeric character. Find whether the string is palindrome or not.
  If you are unable to solve it then it may result in the death of Iron Man.

  Input:
  The first line of the input contains t, the number of test cases. Each line of the test case contains string 'S'.

  Output:
  Each new line of the output contains "YES" if the string is palindrome and "NO" if the string is not a palindrome.

  Constraints:
  1<=t<=100
  1<=|S|<=100000
  Note: Consider alphabets and numbers only for palindrome check. Ignore symbols and whitespaces.

  Example:
  Input:
  2
  I am :IronnorI Ma, i
  Ab?/Ba

  Output:
  YES
  YES
*/

/*determine whether string is palindrome
only consider alhpanumeric characters*/

let str = `2\nI am :IronnorI Ma, i\nAb?/Ba`

const isPalindrome = str => {
  // Time complexity is n
  // Space complexity is linear n
  let reg = RegExp(/[^0-9a-zA-Z\n]/g)

  let lines =
    str
    .split('\n')
    .slice(1)
    .join('\n')
    .replace(reg, '')
    .split('')
    .map(character => character.toLowerCase()).join('')
    .split('\n')

  let stillPalindrome = false;

  lines.forEach(el => {
    if (el === el.split('').reverse().join('')) {
      stillPalindrome = true
    } else {
      stillPalindrome = false
    }
  })

  return stillPalindrome
}

console.log(isPalindrome(str))
