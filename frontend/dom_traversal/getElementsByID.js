const getElementsByID = (node, id, result = []) => {
  if (validate(node, id)) {
    result.push(node);
  }

  node && [...node.children].forEach(child => {
    result = getElementsByID(child, id, result);
  });

  return result;
}


const validate = (node, id) => {
	if (node && node.id) {
		return node.id === id;
  }

  return false;
}
