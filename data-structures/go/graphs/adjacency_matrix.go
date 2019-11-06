package graphs

import (
  "errors"
  "google-interview-prep/data-structures/go/stacks"
  "google-interview-prep/data-structures/go/queues"
)

type AM struct {
	Vertexes   [][]int
	VertexList []string
}

func ConstructAM() *AM {
	return &AM{
		Vertexes:   make([][]int, 0),
		VertexList: make([]string, 0),
	}
}

func (g *AM) AddVertex(node string) {
	g.Vertexes = append(g.Vertexes, make([]int, 0))
	for i, _ := range g.Vertexes {
		for len(g.Vertexes[i]) < len(g.Vertexes) {
			g.Vertexes[i] = append(g.Vertexes[i], 0)
		}
	}
	g.VertexList = append(g.VertexList, node)
}

func (g *AM) Contains(node string) bool {
	for _, vert := range g.VertexList {
		if vert == node {
			return true
		}
	}

	return false
}

func (g *AM) GetEdgeIndex(node string) int {
	fromIdx := 0
	for i, ver := range g.VertexList {
		if ver == node {
			fromIdx = i
		}
	}

	return fromIdx
}

func (g *AM) RemoveVertex(node string) (bool, error) {
	v := false

	if g.Contains(node) {
		v = true
	} else {
		return false, errors.New("Vertex doesn't exist")
	}

	fromIdx := g.GetEdgeIndex(node)

	if fromIdx == 0 {
		g.VertexList = g.VertexList[1 : len(g.VertexList)-1]
	} else {
		start := g.VertexList[0:fromIdx]
		end := g.VertexList[fromIdx+1 : len(g.VertexList)-1]
		g.VertexList = make([]string, 0)
		g.VertexList = append(g.VertexList, start...)
		g.VertexList = append(g.VertexList, end...)
	}

	for _, vert := range g.Vertexes {
		for j, _ := range vert {

			g.RemoveEdges(g.VertexList[fromIdx], g.VertexList[j])

			if fromIdx == 0 {
				vert = vert[1 : len(vert)-1]
			} else {
				start := vert[0:fromIdx]
				end := vert[fromIdx+1 : len(vert)-1]
				vert = make([]int, 0)
				vert = append(vert, start...)
				vert = append(vert, end...)
			}

		}
	}

	return v, nil
}

func (g *AM) HasEdge(fromNode, toNode string) bool {
	fromIdx, toIdx := g.GetEdgeIndex(fromNode), g.GetEdgeIndex(toNode)

	if g.Vertexes[fromIdx][toIdx] == 1 {
		return true
	}

	return false
}

func (g *AM) SameNodes(fromNode, toNode string) bool {
	return fromNode == toNode
}

func (g *AM) HasAllEdges(fromNode, toNode string) bool {
	return g.HasEdge(fromNode, toNode) && g.HasEdge(toNode, fromNode)
}

func (g *AM) AddEdge(fromNode, toNode string) {
	fromIdx, toIdx := g.GetEdgeIndex(fromNode), g.GetEdgeIndex(toNode)
	g.Vertexes[fromIdx][toIdx] = 1
}

func (g *AM) AddEdges(fromNode, toNode string) {
	g.AddEdge(fromNode, toNode)
	g.AddEdge(toNode, fromNode)
}

func (g *AM) RemoveEdge(fromNode, toNode string) {
	fromIdx, toIdx := g.GetEdgeIndex(fromNode), g.GetEdgeIndex(toNode)
	g.Vertexes[fromIdx][toIdx] = 0
}

func (g *AM) RemoveEdges(fromNode, toNode string) {
	g.RemoveEdge(fromNode, toNode)
	g.RemoveEdge(toNode, fromNode)
}

func (g *AM) DFS(fromNode string) []string {
	s := &stacks.StringStack{
		Items: make([]string, 0),
		Size:  0,
	}
	seen := make(map[string]bool)

	s = g.DepthFistSearch(fromNode, s, seen)
	return s.Items
}

func (g *AM) DepthFistSearch(node string, s *stacks.StringStack, seen map[string]bool) *stacks.StringStack {
	if s.Size == len(g.Vertexes) {
		return s
	}

	if !seen[node] {
		seen[node] = true
		s.Push(node)
	}

	fromIdx := g.GetEdgeIndex(node)

	for i, _ := range g.Vertexes[fromIdx] {
		if seen[g.VertexList[i]] == false && g.Vertexes[fromIdx][i] == 1 {
			s = g.DepthFistSearch(g.VertexList[i], s, seen)
		}
	}

	return s
}

func (g *AM) BFS(fromNode string) []string {
	q := &queues.StringQueue{
		Items: make([]string, 0),
		Size:  0,
	}
	s := &stacks.StringStack{
		Items: make([]string, 0),
		Size:  0,
	}
	seen := make(map[string]bool)

	s = g.BreadthFirstSearch(fromNode, q, s, seen)
	return s.Items
}

func (g *AM) BreadthFirstSearch( node string, q *queues.StringQueue, s *stacks.StringStack, seen map[string]bool) *stacks.StringStack {
	if s.Size == len(g.Vertexes) {
		return s
	}

	if !seen[node] {
		seen[node] = true
		s.Push(node)
	}

	fromIdx := g.GetEdgeIndex(node)

	for i, _ := range g.Vertexes[fromIdx] {
		if !seen[g.VertexList[i]] && g.Vertexes[fromIdx][i] == 1 {
			q.Enqueue(g.VertexList[i])
		}
	}

	for q.Size != 0 {
		popped := q.Dequeue()
		s = g.BreadthFirstSearch(popped, q, s, seen)
	}

	return s
}
