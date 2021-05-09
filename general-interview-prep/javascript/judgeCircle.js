/**
 * @param {string} moves
 * @return {boolean}
 */
 var judgeCircle = function(moves) {
  const map = {}
  
  for (let char of moves){
      map[char] = map[char] + 1 || 1
  }
  
  return (map['L'] === map['R'] && map['U'] === map['D']) 
};
