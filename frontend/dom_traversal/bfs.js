/*
 * BFS of All DOM Nodes
 */

function bfs(node, nodes = []) {
  if (node !== null) {
    let queue = [];
    queue.unshift(node);
    // add to front of queue

    while(queue.length) {
      let item = queue.shift();
      // pop off from front of queue
      nodes.push(item);
      // push into results array
      [...item.children].forEach(child => queue.push(child));
      // for each child in the currently popped off item from the queue,
      // push it to the back of the line in the queue
    }
  }

  return nodes;
}
