package main

import (
  "fmt"
  "sort"
)

// Cleaner solution
// less space allocated

func mergeCleaner(intervals [][]int) [][]int {
    sort.Slice(intervals, func(i,j int) bool {
        return intervals[i][0] < intervals[j][0]
    })
    k := 0
    for i := 0; i < len(intervals); {
        j := i + 1
        for j < len(intervals) && intervals[j][0] <= intervals[i][1] {
            if intervals[j][1] > intervals[i][1] {
                intervals[i][1] = intervals[j][1]
            }
            j++
        }
        intervals[k] = intervals[i]
        i = j
        k++
    }
    return intervals[0:k]
}

type Interval struct {
    Start int
    End int
}

func merge(intervals [][]int) [][]int {
  intervalArr := make([]Interval, 0)

  for i := 0; i < len(intervals); i++ {
    inter := &Interval{
      Start: intervals[i][0],
      End: intervals[i][1],
    }

    intervalArr = append(intervalArr, *inter)
  }
  sort.Sort(ByStart(intervalArr))
  interLen := len(intervalArr)

  for i := 0; i < interLen-1; {
    cur, next := intervalArr[i], intervalArr[i+1]
    if next.Start <= cur.End {
      if next.End > cur.End {
        intervalArr[i].End = intervalArr[i+1].End
      }
      intervalArr = append(intervalArr[:i+1], intervalArr[i+2:]...)
      interLen--
      continue
    }
    i++
  }

  result := make([][]int, 0)

  for i := 0; i < len(intervalArr); i++ {
    result = append(result, []int{intervalArr[i].Start, intervalArr[i].End})
  }

  return result
}

type ByStart []Interval

func (bs ByStart) Len() int {
	return len(bs)
}
func (bs ByStart) Swap(i, j int) {
	bs[i], bs[j] = bs[j], bs[i]
}
func (bs ByStart) Less(i, j int) bool {
	return bs[i].Start < bs[j].Start
}

func main() {
  intervals := [][]int{
    []int{1, 3},
    []int{2, 6},
    []int{8, 10},
    []int{15, 18},
  }

  intervals2 := [][]int{
    []int{1, 4},
    []int{4, 5},
  }

  fmt.Println(intervals, " => ", merge(intervals))
  fmt.Println(intervals2, " => ", merge(intervals2))
  fmt.Println(intervals, " => ", mergeCleaner(intervals))
  fmt.Println(intervals2, " => ", mergeCleaner(intervals2))
}
