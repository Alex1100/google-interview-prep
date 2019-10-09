package sets

type DisjointStringSet struct {
  Rank []string
  Parent []string
  Capacity int
}

func ConstructSet(capacity int) *DisjointStringSet {
  return &DisjointStringSet{
    Rank: make([]string, 0, capacity),
    Parent: make([]string, 0, capacity),
    Capacity: capacity,
  }
}

func (dj *DisjointStringSet) Find(x string) string {
  if dj.Parent[x] != x {
    dj.Parent[x] = dj.Find(parent[x])
  }

  return dj.Parent[x]
}

func (dj *DisjointStringSet) Union(x, y string) {
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
