package sets

type DisjointIntSet struct {
  Rank []int
  Parent []int
  Capacity int
}

func ConstructSet(capacity int) *DisjointIntSet {
  return &DisjointIntSet{
    Rank: make([]int, 0, capacity),
    Parent: make([]int, 0, capacity),
    Capacity: capacity,
  }
}

func (dj *DisjointIntSet) Find(x int) int {
  if dj.Parent[x] != x {
    dj.Parent[x] = dj.Find(parent[x])
  }

  return dj.Parent[x]
}

func (dj *DisjointIntSet) Union(x, y int) {
  xset = dj.Find(x)
  yset = dj.Find(y)

  if xset == yset {
    return
  }

  if dj.Rank[xset] < dj.Rank[yset] {
    dj.Parent[xset] = yset
  } else if dj.Rank[xset] > dj.Rank[yset] {
    dj.Parent[yset] = xset
  } else {
    dj.Parent[yset] = xset
    dj.Rank[xset] = dj.Rank[xset] + 1
  }
}
