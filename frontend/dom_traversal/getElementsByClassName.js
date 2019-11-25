const getElementsByClassName = (node, klass, result = []) => {
  if (condition(node, klass)) {
    result.push(node);
  }
  node && [...node.children].forEach(child => {
    result = getElementsByClassName(child, klass, result);
  });

  return result;
}


const condition = (node, klass) => {
  if (node) {
  	if (node.className) {
  		return node.className.split(' ').includes(klass);
    }
  }

  return false;
}
