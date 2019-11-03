package tests

import (
  "testing"
  "fmt"
  "google-interview-prep/data-structures/go/sets"
)

var intSet1 *sets.DisjointIntSet
var intSet2 *sets.DisjointIntSet
var intSet3 *sets.DisjointIntSet
var intSet4 *sets.DisjointIntSet
var intSet5 *sets.DisjointIntSet
var intSet6 *sets.DisjointIntSet

func TestSet_Union(t *testing.T) {
  intSet1 = sets.ConstructIntSet(5)
  intSet2 = sets.ConstructIntSet(10)
  intSet3 = sets.ConstructIntSet(20)
  intSet4 = sets.ConstructIntSet(30)
  intSet5 = sets.ConstructIntSet(40)
  intSet6 = sets.ConstructIntSet(50)

  intSet1.Union(intSet2)
  intSet3.Union(intSet6)
  intSet4.Union(intSet5)
  intSet2.Union(intSet4)
  intSet4.Union(intSet1)
}

func TestSet_Find(t *testing.T) {
  x := intSet3.Find(intSet6)
  p := intSet1.Find(intSet2)
  fmt.Println(p.Data, p.Children)
  fmt.Println(x.Data, x.Children)
}
