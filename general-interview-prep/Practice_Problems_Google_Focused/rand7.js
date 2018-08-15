const rand7Float = (decimal_place) => {
  let c = Infinity;
  let rounder = (10 ** decimal_place);

  while (c > 21) {
    let a = ((Math.random() * (0.0, 5.0) * rounder)/rounder);
    let b = ((Math.random() * (0.0, 5.0) * rounder)/rounder);
    if (a < 6.0 && b < 6.0) {
      a += Math.round((Math.random() * (0.0, 1) * rounder)/rounder);
      b += Math.round((Math.random() * (0.0, 1) * rounder)/rounder)
    }
    c = Math.round(((5 * a) + b) * rounder)/rounder;
  }

  return Math.round(((c % 7) + (1/rounder)) * rounder)/rounder;
}


const rand7 = () => {
  let c = Infinity;
  while (c > 21) {
    let a = Math.floor(Math.random() * 5);
    let b = Math.floor(Math.random() * 5);
    c = ((5 * a) + b);
  }

  return (c % 7) + 1;
}



let res = 0;
function derp() {
  while(res < 7.0) {
    res = rand7Float(2)
    console.log("RES IS: ", res);
  }
  console.log("FINAL RES IS: ", res);
}

console.log(rand7());
console.log(rand7Float(2));
derp();
