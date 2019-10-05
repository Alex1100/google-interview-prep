const bellNumber = (num) => {
  let bell = [[]];

  bell[0].push(1);

  for (let i = 1; i <= num; i++) {
    bell.push([]);
    bell[i].push(bell[i - 1][i - 1]);
    console.log('BELL I IS: ', bell[i]);

    for (let j = 1; j <= i; j++) {
      bell[i][j] = (bell[i - 1][j - 1] + bell[i][j-1]);
      console.log('BELL I J IS: ', bell[i][j]);
    }
  }

  return bell[num][0];
}

console.log(bellNumber(9));
