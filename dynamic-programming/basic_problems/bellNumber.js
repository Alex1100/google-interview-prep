const bellNumber = (num) => {
  let bell = [[]];

  bell[0].push(1);

  for (let i = 1; i <= num; i++) {
    bell.push([]);
    bell[i].push(bell[i - 1][i - 1]);

    for (let j = 1; j <= i; j++) {
      bell[i][j] = (bell[i - 1][j - 1] + bell[i][j-1]);
    }
  }

  return bell[num][0];
}


console.log(bellNumber(10));
