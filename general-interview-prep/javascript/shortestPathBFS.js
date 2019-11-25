const shortestPath = (adj, s, dest, v) => {
  let pred = [];
  let dist = [];

  if (bfsTraversal(adj, s, dest, v, pred, dist) === false) {
    return;
  }

  let path = [];
  let crawl = dest;
  path.push(crawl);
  while(pred[crawl] !== -1) {
    path.push(pred[crawl]);
    crawl = pred[crawl];
  }

  return {
    distance: dist[dest],
    path,
  }
};

const bfsTraversal = (adj, src, dest, v, pred, dist) => {
  let queue = [];

  let visited = [];

  for (let i = 0; i < v; i++) {
    visited[i] = false;
    dist[i] = Infinity;
    pred[i] = -1;
  }

  visited[src] = true;
  dist[src] = 0;
  queue.push(src);

  while(queue.length) {
    let u = queue[0];
    queue.unshift();

    for (let i = 0; i < adj[u].length; i++) {
      if (visited[adj[u][i]] === false) {
        visited[adj[u][i]] = true;

        dist[adj[u][i]] = dist[u] + 1;
        pred[adj[u][i]] = u;
        queue.push(adj[u][i]);


        if (adj[u][i] === dest) {
          return true;
        }
      }
    }
  }

  return false;
}
