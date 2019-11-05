package graphs

import "errors"

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
