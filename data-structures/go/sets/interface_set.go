package sets
//
// type DisjointSet struct {
//   Rank []interface{}
//   Parent []interface{}
//   Capacity int
// }
//
// func ConstructSet(capacity int) *DisjointSet {
//   return &DisjointSet{
//     Rank: make([]interface{}, 0, capacity),
//     Parent: make([]interface{}, 0, capacity),
//     Capacity: capacity,
//   }
// }
//
// func (dj *DisjointSet) Find(x interface{}) interface{} {
//   if dj.Parent[x] != x {
//     dj.Parent[x] = dj.Find(parent[x])
//   }
//
//   return dj.Parent[x]
// }
//
// func (dj *DisjointSet) Union(x, y interface{}) {
//   xset = dj.Find(x)
//   yset = dj.Find(y)
//
//   if xset == yset {
//     return
//   }
//
//   if dj.Rank[xset] < dj.Rank[yset] {
//     dj.Parent[xset] = yset
//   } else if dj.Rank[xset] > dj.Rank[yset] {
//     dj.Parent[yset] = xset
//   } else {
//     dj.Parent[yset] = xset
//     dj.Rank[xset] = dj.Rank[xset] + 1
//   }
// }
