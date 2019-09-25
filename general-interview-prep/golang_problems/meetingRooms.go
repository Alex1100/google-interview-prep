package main

import (
  "fmt"
  "sort"
)

/*
 * 1. Separate out the start times and the end times in their separate arrays.
 *
 * 2. Sort the start times and the end times separately. Note that this will mess up the original correspondence of start times and end times. They will be treated individually now.
 *
 * 3. We consider two pointers: s_ptr and e_ptr which refer to start pointer and end pointer. The start pointer simply iterates over all the meetings and the end pointer helps us track if a meeting has ended and if we can reuse a room.
 *
 * 4. When considering a specific meeting pointed to by s_ptr, we check if this start timing is greater than the meeting pointed to by e_ptr. If this is the case then that would mean some meeting has ended by the time the meeting at s_ptr had to start. So we can reuse one of the rooms. Otherwise, we have to allocate a new room.
 *
 * 5. If a meeting has indeed ended i.e. if start[s_ptr] >= end[e_ptr], then we increment e_ptr.
 * 6. Repeat this process until s_ptr processes all of the meetings.
 *
 * Other option would be to use a Min-Heap/PriorityQueue
 *
 */

func minMeetingRooms(intervals [][]int) int {
  end := 0
  roomCount := 0
  startTimes := make([]int, 0)
  endTimes := make([]int, 0)

  if len(intervals) == 0 {
    return 0
  }

  for _, arr := range intervals {
    startTimes = append(startTimes, arr[0])
    endTimes = append(endTimes, arr[1])
  }

  sort.Ints(startTimes)
  sort.Ints(endTimes)

  for i := 0; i < len(startTimes); i++ {
    if startTimes[i] >= endTimes[end] {
      end++
      } else {
        roomCount++
      }
  }

  return roomCount
}


func main() {
  var meetings1 [][]int
  var meetings2 [][]int

  meetings1 = [][]int{
    []int{0, 30},
    []int{5, 10},
    []int{15, 20},
  }

  meetings2 = [][]int{
    []int{7, 10},
    []int{2, 4},
  }
  fmt.Println("NUMBER OF ROOMS REQUIRED: ", minMeetingRooms(meetings1))
  fmt.Println("NUMBER OF ROOMS REQUIRED: ", minMeetingRooms(meetings2))
}
