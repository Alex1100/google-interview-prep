let matrix = [
  [0, 0, 1, 1, 0],
  [0, 0, 1, 0, 0],
  [1, 1, 0, 0, 0],
  [1, 0, 0, 0, 1],
  [0, 0, 0, 1, 0]
];

// depthFirstSearch with a binary matrix or an adjacency matrix


const dfs = (board, start = 0) => {
  let stack = [];
  let visited = {};
  dfsRecurse(stack, start, visited, board);
  return stack;
}

const dfsRecurse = (stack, start, visited, board) => {
  if (stack.legnth === board.length) {
    return stack;
  }

  if (visited[start] === undefined) {
    stack.push(+start);
    visited[start] = 1;
  }

  let edges = board[start];
  for (let i in edges) {
    if (edges[i] === 1 && visited[i] === undefined) {
      dfsRecurse(stack, i, visited, board);
    }
  }
};



const bfs = (board, start = 0) => {
  let queue = [];
  let stack = [];
  let visited = {};
  bfsRecurse(start, visited, board, queue, stack);
  return stack;
}


const bfsRecurse = (start, visited, board, node_queue, result) => {
  if (result.size === board.length) {
    return;
  }

  if(!visited[start]) {
    result.unshift(start);
    visited[start] = true;
  }

  if (node_queue.indexOf(start) >= 0) {
    node_queue.shift();
  }

  let edges = board[start];

  for (let i in edges) {
    if (visited[i] !== true && edges[i] === 1) {
      visited[i] = true;
      node_queue.unshift(i);
      result.unshift(+i);
    }
  }

  node_queue.forEach(node => {
    bfsRecurse(node, visited, board, node_queue, result);
  });
}


console.log(dfs(matrix, 0));
console.log(bfs(matrix, 0));
