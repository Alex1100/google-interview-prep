function findBusiestPeriod(data) {
  let maxOccupants = 0;
  let busiestTime = data[0][0];
  let occupantCount = 0;
 
  for(var i = 0; i < data.length; i++){
    let [timestamp, people, action] = data[i];
    if (action === 1) {
        occupantCount += data[i][1]
    } else {
        occupantCount -= data[i][1]
    }
    
    // check for other data points with the same timestamp
    if (i < data.length - 1 && data[i][0] === data[i+1][0]) {
      continue;
    }

    if (maxOccupants < occupantCount) {
      maxOccupants = Math.max(maxOccupants, occupantCount);
      busiestTime = timestamp;
    }
  }
  
  return busiestTime;
}

const data = [ [ 1487799425, 14, 1 ],
[ 1487799425, 4, 1 ],
[ 1487799425, 2, 1 ],
[ 1487800378, 10, 1 ],
[ 1487801478, 18, 1 ],
[ 1487901013, 1, 1 ],
[ 1487901211, 7, 1 ],
[ 1487901211, 7, 1 ] ];