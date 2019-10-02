const isValidSerialization = (preorder) => {
  let stack = ['root'];
  let order = preorder.split(',');
  let valid = true;

  for (let i = 0; i < order.length; i++) {
    let n = order[i];

    if (stack.length === 0) {
      valid = false;
      break;
    }

    stack.pop();

    if (n !== '#') {
      stack.push('r', 'l');
    }
  }

  return valid && stack.length === 0;
};
