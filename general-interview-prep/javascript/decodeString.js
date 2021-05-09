/**
 * @param {string} s
 * @return {string}
 */
 var decodeString = function(s) {
  let multiplier = [], repeatStr = [], res = "", num = "";

  for(let char of s){

      if(!isNaN(char)){
         num += char; 
      }

      else if(char === "["){
        multiplier.push(num);
        num = "";

        repeatStr.push(res);
        res = "";
      }

      else if(char === "]"){
          res = repeatStr.pop() + res.repeat(multiplier.pop()); 
      }

      else{
          res += char;
      }

  }
  return res;
};