package graphs

import (
  "errors"
  "google-interview-prep/data-structures/go/stacks"
  "google-interview-prep/data-structures/go/queues"
)

type DAM struct {
	Vertexes   [][]int
	VertexList []string
}

func ConstructDAM() *DAM {
	return &DAM{
		Vertexes:   make([][]int, 0),
		VertexList: make([]string, 0),
	}
}

func (g *DAM) AddVertex(node string) {
	g.Vertexes = append(g.Vertexes, make([]int, 0))
	for i, _ := range g.Vertexes {
		for len(g.Vertexes[i]) < len(g.Vertexes) {
			g.Vertexes[i] = append(g.Vertexes[i], 0)
		}
	}
	g.VertexList = append(g.VertexList, node)
}

func (g *DAM) Contains(node string) bool {
	for _, vert := range g.VertexList {
		if vert == node {
			return true
		}
	}

	return false
}

func (g *DAM) GetEdgeIndex(node string) int {
	fromIdx := 0
	for i, ver := range g.VertexList {
		if ver == node {
			fromIdx = i
		}
	}

	return fromIdx
}

func (g *DAM) RemoveVertex(node string) (bool, error) {
	v := false

	if g.Contains(node) {
		v = true
	} else {
		return false, errors.New("Vertex doesn't exist")
	}

	fromIdx := g.GetEdgeIndex(node)

	for _, vert := range g.Vertexes {
		for j, _ := range vert {
			g.RemoveEdges(g.VertexList[fromIdx], g.VertexList[j])
		}
	}

  for i, _ := range g.Vertexes {
    if fromIdx == 0 {
      g.Vertexes[i] = g.Vertexes[i][1:len(g.Vertexes[i])]
    } else if fromIdx == len(g.VertexList) - 1 {
      g.Vertexes[i] = g.Vertexes[i][0:len(g.Vertexes[i]) - 1]
    } else {
      g.Vertexes[i] = append(g.Vertexes[i][:fromIdx], g.Vertexes[i][fromIdx+1:]...)
    }
  }

  if fromIdx == 0 {
    g.VertexList = g.VertexList[1:len(g.VertexList)]
  } else if fromIdx == len(g.VertexList) - 1 {
    g.VertexList = g.VertexList[0:len(g.VertexList) - 1]
  } else {
    g.VertexList = append(g.VertexList[:fromIdx], g.VertexList[fromIdx+1:]...)
  }

	return v, nil
}

func (g *DAM) HasEdge(fromNode, toNode string) bool {
	fromIdx, toIdx := g.GetEdgeIndex(fromNode), g.GetEdgeIndex(toNode)

	if g.Vertexes[fromIdx][toIdx] == 1 {
		return true
	}

	return false
}

func (g *DAM) SameNodes(fromNode, toNode string) bool {
	return fromNode == toNode
}

func (g *DAM) AddEdge(fromNode, toNode string) {
	fromIdx, toIdx := g.GetEdgeIndex(fromNode), g.GetEdgeIndex(toNode)
	g.Vertexes[fromIdx][toIdx] = 1
}

func (g *DAM) AddEdges(fromNode, toNode string) {
  fromIdx, toIdx := g.GetEdgeIndex(fromNode), g.GetEdgeIndex(toNode)
  g.Vertexes[fromIdx][toIdx] = 1
  g.Vertexes[toIdx][fromIdx] = -1
}

func (g *DAM) RemoveEdge(fromNode, toNode string) {
	fromIdx, toIdx := g.GetEdgeIndex(fromNode), g.GetEdgeIndex(toNode)
	g.Vertexes[fromIdx][toIdx] = 0
}

func (g *DAM) RemoveEdges(fromNode, toNode string) {
	g.RemoveEdge(fromNode, toNode)
	g.RemoveEdge(toNode, fromNode)
}

func (g *DAM) hasCycleUtil(sourceNode string, visited map[string]bool, visitedStack *stacks.StringStack) bool {
  if !visited[sourceNode] {
    visitedStack.Push(sourceNode)
    visited[sourceNode] = true
    fromIdx := g.GetEdgeIndex(sourceNode)
    currentEdges := g.Vertexes[fromIdx]

    for node := 0; node < len(currentEdges); node++ {
      if currentEdges[node] == 1 {
        if visited[g.VertexList[node]] == false && g.hasCycleUtil(g.VertexList[node], visited, visitedStack) == true {
          return true
        } else if visitedStack.Contains(g.VertexList[node]) == true {
          return true
        }
      }
    }
  }

  visitedStack.Pop()
  return false
}

func (g *DAM) HasCycle() bool {
  sourceNode := g.VertexList[0]
  visited := make(map[string]bool)
  visitedStack := &stacks.StringStack{
      Items: make([]string, 0),
      Size: 0,
  }

  return g.hasCycleUtil(sourceNode, visited, visitedStack);
}

func (g *DAM) DFS(fromNode string) []string {
	s := &stacks.StringStack{
		Items: make([]string, 0),
		Size:  0,
	}
	seen := make(map[string]bool)

	s = g.DepthFistSearch(fromNode, s, seen)
	return s.Items
}

func (g *DAM) DepthFistSearch(node string, s *stacks.StringStack, seen map[string]bool) *stacks.StringStack {
	if s.Size == len(g.Vertexes) {
		return s
	}

	if !seen[node] {
		seen[node] = true
		s.Push(node)
	}

	fromIdx := g.GetEdgeIndex(node)

	for i, _ := range g.Vertexes[fromIdx] {
		if seen[g.VertexList[i]] == false && g.Vertexes[fromIdx][i] != 0 {
			s = g.DepthFistSearch(g.VertexList[i], s, seen)
		}
	}

	return s
}

func (g *DAM) BFS(fromNode string) []string {
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

func (g *DAM) BreadthFirstSearch( node string, q *queues.StringQueue, s *stacks.StringStack, seen map[string]bool) *stacks.StringStack {
	if s.Size == len(g.Vertexes) {
		return s
	}

	if !seen[node] {
		seen[node] = true
		s.Push(node)
	}

	fromIdx := g.GetEdgeIndex(node)

	for i, _ := range g.Vertexes[fromIdx] {
		if !seen[g.VertexList[i]] && g.Vertexes[fromIdx][i] != 0 {
			q.Enqueue(g.VertexList[i])
		}
	}

	for q.Size != 0 {
		popped := q.Dequeue()
		s = g.BreadthFirstSearch(popped, q, s, seen)
	}

	return s
}
