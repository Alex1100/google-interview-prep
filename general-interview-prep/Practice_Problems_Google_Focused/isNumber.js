/**
 * @param {string} s
 * @return {boolean}
 */
const isNumberJS = (s) => s.trim().length !== 0 && !isNaN(Number(s));

const isNumberAgnostic = (s) => {
    /**
 * @param {string} s
 * @return {boolean}
 */
  let start = 0;
  let end = s.length;

  while(start < end && s.charAt(start) == ' '){
    start++; //skip the leadingwhitspace
  }

  if (start < end && (s.charAt(start) == '+' || s.charAt(start) == '-')){
    start++; //skip sign
  }

  //test the number before . or e
  let isNums = false;

  while(start < end && new RegExp(/^[0-9]$/).test(s.charAt(start))){
    start++;
    isNums = true;
  }
  if (start < end && s.charAt(start) == '.') {//. numbers is true
    start++; //skip '.'

    while (start < end && new RegExp(/^[0-9]$/).test(s.charAt(start))){
      start++;
      isNums = true;
    }
  }

  if (isNums && start < end && s.charAt(start) == 'e') { //test numbers + e + (sign)numbers
    start++; // skip e
    isNums = false;
    if (start < end && (s.charAt(start) == '+' || s.charAt(start) == '-')){
      start++; // skip sign
    }

    while (start < end && new RegExp(/^[0-9]$/).test(s.charAt(start))){
      start++;
      isNums = true;
    }
  }

  while(start < end && s.charAt(start) == ' ') {
    start++; //skip tailing whitspaces
  }

  return isNums && start == end;
}

console.log(isNumberJS("2e10"));
console.log(isNumberJS("22"));
console.log(isNumberJS("2.22"))
console.log(isNumberJS("aaa"));

console.log("\n\n\n")

console.log(isNumberAgnostic("2e10"));
console.log(isNumberAgnostic("22"));
console.log(isNumberAgnostic("2.22"))
console.log(isNumberAgnostic("aaa"));
