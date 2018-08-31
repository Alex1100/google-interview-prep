class Interval {
  constructor() {
    this.buy = 0;
    this.sell = 0;
  }
}


const stockBuySell = (arr) => {
  if (arr.length === 1) {
    return;
  }

  let count = 0;

  let sol = [];

  let i = 0;

  while(i < arr.length -1) {
    while((i < arr.length - 1) && arr[i + 1] <= arr[i]) {
      i++;
    }

    if (i === arr.length - 1) {
      break;
    }

    let e = new Interval();
    e.buy = i++;

    while((i < arr.length) && (arr[i] >= arr[i - 1])) {
      i++;
    }

    e.sell = i - 1;
    sol.push(e);
    count++;
  }

  if (count === 0) {
    console.log("NO BUENO COMPA, HODL")
  } else {
    for (let z = 0; z < count; z++) {
      console.log("BUY ON DAY: ", sol[z].buy, " AND SELL ON DAY: ", sol[z].sell);
    }
  }

  return;
}

let arr = [100, 180, 260, 310, 40, 535, 695]

console.log(stockBuySell(arr));
