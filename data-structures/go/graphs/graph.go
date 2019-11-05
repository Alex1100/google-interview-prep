package graphs

import (
  "errors"
  "google-interview-prep/data-structures/go/stacks"
)

type Edge struct {
  To *Vertex
  From *Vertex
  Weight int
}

type Vertex struct {
  Point string
  Edges map[string]*Edge
}

type Graph struct {
  Vertexes map[string]*Vertex
}

func ConstructGraph() *Graph {
	return &Graph{
		Vertexes: make(map[string]*Vertex),
	}
}

func (g *Graph) AddNode(node string) {
  g.Vertexes[node] = &Vertex{
    Point: node,
    Edges: make(map[string]*Edge),
  }
}

func (g *Graph) Contains(node string) bool {
  return g.Vertexes[node] != nil
}

func (g *Graph) RemoveNode(node string) (*Vertex, error) {
  var v *Vertex

  if g.Contains(node) {
    v = g.Vertexes[node]
  } else {
    return nil, errors.New("Vertex doesn't exist")
  }

  for _, vert := range g.Vertexes {
    if g.HasEdge(vert.Point, node) {
      g.RemoveEdge(vert.Point, node)
    }
  }

  delete(g.Vertexes, node)
  return v, nil
}

func (g *Graph) HasEdge(fromNode, toNode string) bool {
  return g.Vertexes[fromNode].Edges[toNode] != nil
}

func (g *Graph) SameNodes(fromNode, toNode string) bool {
  return fromNode == toNode
}

func (g *Graph) HasAllEdges(fromNode, toNode string) bool {
  return g.HasEdge(fromNode, toNode) && g.HasEdge(toNode, fromNode)
}

func (g *Graph) AddEdge(fromNode, toNode string) {
  g.Vertexes[fromNode].Edges[toNode] = &Edge{
    To: &Vertex{
    	Point: toNode,
    	Edges: make(map[string]*Edge),
    },
    From: &Vertex{
    	Point: fromNode,
    	Edges: make(map[string]*Edge),
    },
  }
}

func (g *Graph) AddEdges(fromNode, toNode string) {
  g.AddEdge(fromNode, toNode)
  g.AddEdge(toNode, fromNode)
}

func (g *Graph) RemoveEdge(fromNode, toNode string) {
  delete(g.Vertexes[fromNode].Edges, toNode)
}

func (g *Graph) DFS(fromNode string) []string {
	s := &stacks.StringStack{
		Items: make([]string, 0),
		Size:  0,
	}
	seen := make(map[string]bool)
	// start off at the fromNode
	// then for each edge found on the current node
	// call the dfs function on the edge and it's edges
	// do this until the original vertex's edges dfs
	// calls have popped off the call stack
	// stack should now be full
	// return the stacks items

	s = g.DepthFistSearch(fromNode, s, seen)
	return s.Items
}

func (g *Graph) DepthFistSearch(node string, s *stacks.StringStack, seen map[string]bool) *stacks.StringStack {
	if s.Size == len(g.Vertexes) {
		return s
	}

	if !seen[node] {
		seen[node] = true
		s.Push(node)
	}

	for _, edge := range g.Vertexes[node].Edges {
		if seen[edge.To.Point] == false {
			s = g.DepthFistSearch(edge.To.Point, s, seen)
		}
	}

	return s
}

func (g *Graph) BFS() []string {
  //TODO
}

func (g *Graph) BreadthFirstSearch(queue *Queue) *Queue {
  //TODO
}
