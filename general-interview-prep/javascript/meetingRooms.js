/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function(intervals) {
  let end = 0;
  let roomCount = 0;
  let startTimes = [];
  let endTimes = [];

  if (intervals.length === 0) {
    return 0
  }

  intervals.forEach(arr => {
    startTimes.push(arr[0]);
    endTimes.push(arr[1]);
  });

  startTimes.sort((a, b) => a - b);
  endTimes.sort((a, b) => a - b);

  for (let i = 0; i < startTimes.length; i++) {
    if (startTimes[i] >= endTimes[end]) {
      end++
    } else {
      roomCount++
    }
  }

  return roomCount
};
