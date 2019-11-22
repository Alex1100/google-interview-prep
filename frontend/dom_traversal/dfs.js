/*
 * DFS of All DOM Nodes
 */
 
function dfs(elem, result = []) {
  result.push(elem);
  elem && [...elem.children].forEach(function(az) {
    result = dfs(az, result);
  });

  return result;
}
