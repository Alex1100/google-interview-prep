package binary_search_trees

type Node struct {
  Parent *Node
  Left *Node
  Right *Node
  Data int
}

type BST struct {
  Root *Node
}

const (
  InOrder string = "in_order"
  PreOrder string = "pre_order"
  PostOrder string = "post_order"
)

func ConstructTree(val int) *BST {
  return &BST{
    Root: &Node{
      Parent: nil,
      Left: nil,
      Right: nil,
      Data: val,
    },
  }
}

func (t *BST) AddLeaf(val int) {

}

func (t *BST) RemoveLeaf(val int) (int, error) {

}

func (t *BST) ContainsLeaf(val int) bool {

}

func (t *BST) depthFirstSearch(node string, result []int) []int {

}

func (t *BST) DFS(orderType string) []int {

}

func (t *BST) BFS() []int {
  result := make([]int, 0)
}

func (t *BST) FindMin() int {

}

func (t *BST) FindMax() int {

}

func (t *BST) IsValidBST() int {

}

func (t *BST) FindParent(leaf int) int {

}
