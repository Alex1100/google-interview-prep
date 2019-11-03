package sets

type DisjointIntSet struct {
  Parent *DisjointIntSet
  Data int
  Rank int
  Children map[*DisjointIntSet]*DisjointIntSet
}

func ConstructIntSet(data int) *DisjointIntSet {
  return &DisjointIntSet{
    Rank: 0,
    Parent: nil,
    Data: data,
    Children: make(map[*DisjointIntSet]*DisjointIntSet),
  }
}

func (dj *DisjointIntSet) Find(x *DisjointIntSet) *DisjointIntSet {
  if dj.Parent == x {
    return x
  } else {
    return dj.Find(dj.Parent)
  }
}

func (dj *DisjointIntSet) Union(set *DisjointIntSet) {
  if dj.Rank > set.Rank {
    set.Parent = dj
  } else if dj.Rank < set.Rank {
    set.Children[dj.Parent] = dj
    dj.Parent = set
  } else {
    set.Children[dj.Parent] = dj
    dj.Parent = set
    set.Rank++
  }
}
