const naivelyRaiseToThePowerOf = (x, y) => {
  //initialize result
  let result = 1;

  while(y > 0) {
    // if y is odd
    // multiply x with result
    if (y & 1) {
      result = result * x;
    }

    y = y >> 1; // y = y/2
    x = x*x // change x to x^2
  }

  return result;
}

const modularExponentiation = (x, y, p) => {
  let result = 1;

  x = x % p;

  while(y > 0) {
    if (y & 1) {
      result = (result * x) %p;
    }

    y = y >> 1;
    x = (x * x) % p;
  }

  return result;
}


console.log(naivelyRaiseToThePowerOf(2, 3));
console.log(naivelyRaiseToThePowerOf(3, 2));
console.log(naivelyRaiseToThePowerOf(3, 3));
console.log(naivelyRaiseToThePowerOf(2, 4));
console.log(naivelyRaiseToThePowerOf(2, 5));
console.log(naivelyRaiseToThePowerOf(2, 6));
console.log(naivelyRaiseToThePowerOf(2, 7));
console.log(naivelyRaiseToThePowerOf(2, 8));
console.log(naivelyRaiseToThePowerOf(2, 9));
console.log(naivelyRaiseToThePowerOf(2, 10));
console.log(naivelyRaiseToThePowerOf(2, 11));
console.log(naivelyRaiseToThePowerOf(2, 12));
console.log(naivelyRaiseToThePowerOf(2, 13));
console.log(naivelyRaiseToThePowerOf(2, 14));
console.log(naivelyRaiseToThePowerOf(2, 15));
console.log(naivelyRaiseToThePowerOf(2, 16));
console.log(naivelyRaiseToThePowerOf(2, 17));
console.log(naivelyRaiseToThePowerOf(2, 18));
console.log(naivelyRaiseToThePowerOf(2, 19));
console.log(naivelyRaiseToThePowerOf(2, 20));
console.log(naivelyRaiseToThePowerOf(2, 21));
console.log(naivelyRaiseToThePowerOf(2, 22));
console.log(naivelyRaiseToThePowerOf(2, 23));
console.log(naivelyRaiseToThePowerOf(2, 24));
console.log(naivelyRaiseToThePowerOf(2, 25));
console.log(naivelyRaiseToThePowerOf(2, 1023));
console.log("\n", naivelyRaiseToThePowerOf(2, 1023) % 200)
console.log(modularExponentiation(2, 102300, 200))
