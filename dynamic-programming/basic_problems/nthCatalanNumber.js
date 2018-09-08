const nthCatalanNumber = (num) => {
  let catalan = [1, 1];
  for (let i = 2; i <= num; i++) {
    catalan.push(0);
    for (let j = 0; j < i; j++) {
      catalan[i] += catalan[j] * catalan[i - j - 1];
    }
  }

  return catalan[num];
}


console.log(nthCatalanNumber(8))
