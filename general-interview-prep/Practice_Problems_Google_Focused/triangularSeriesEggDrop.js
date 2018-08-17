const findLowestFloor = (eggs, topFloor) => {
  let breakingPoint = breakAtRandom(1, topFloor);
  let pointer1 = 1;
  let pointer2 = Math.floor(Math.sqrt(topFloor));

  eggs.egg1[0] = pointer1;
  eggs.egg2[0] = pointer2;
  let counter = Math.floor(Math.sqrt(topFloor));
  let dropCount = 0;

  while(eggs.egg1[1] === 'good' && eggs.egg2[1] === 'good') {
    if (counter <= 0) {
      counter = Math.floor(Math.sqrt(topFloor));
    }
    eggs.egg1[0] = pointer1;
    eggs.egg2[0] = pointer2;
    console.log(eggs);
    dropCount+=2

    if (eggs.egg1[0] >= breakingPoint) {
      return eggs.egg1[0];
    }

    if (eggs.egg1[0] < breakingPoint && eggs.egg2[0] >= breakingPoint) {
      eggs.egg2[1] = 'bad'
      let temp = pointer2;
      let pointer1 = eggs.egg1[0]++;
    }

    if (eggs.egg1[0] < breakingPoint && eggs.egg2[0] < breakingPoint) {
      let temp = pointer2 + 1;
      pointer1 = temp;
      counter--;
      pointer2 = (pointer2 + counter);
    }
  }

  for (let i = pointer1; i <= pointer2; i++) {
    eggs.egg1[0] = pointer1;
    if (i === breakingPoint) {
      console.log("DROP COUNT IS: ", dropCount)
      return i;
    } else {
      dropCount++;
      pointer1++;
    }
  }
};


const breakAtRandom = (lastVisisted, topFloor) => Math.floor(Math.random() * (lastVisisted, topFloor)) + 1;


console.log(findLowestFloor({ egg1: [0, 'good'], egg2: [0, 'good'] }, 100));
