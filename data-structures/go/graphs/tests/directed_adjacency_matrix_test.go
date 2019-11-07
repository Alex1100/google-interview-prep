package tests

import (
  "testing"
  "google-interview-prep/data-structures/go/graphs"
)

var testDAM *graphs.DAM

func TestDirectedAdjacencyMatrix_AddVertex(t *testing.T) {
  testDAM = graphs.ConstructDAM()
  testDAM.AddVertex("A")
  testDAM.AddVertex("B")
  testDAM.AddVertex("C")
  testDAM.AddVertex("D")
  testDAM.AddVertex("E")
  testDAM.AddVertex("F")
  testDAM.AddVertex("G")
  testDAM.AddVertex("H")
  testDAM.AddVertex("Z")

  fromIdx := testDAM.GetEdgeIndex("A")

  if testDAM.VertexList[fromIdx] != "A" {
    t.Error("Unable to add Vertex properly. ", testDAM.VertexList[fromIdx])
  }
}

func TestDirectedAdjacencyMatrix_RemoveVertex(t *testing.T) {
  deleted, err := testDAM.RemoveVertex("Z")
  if deleted != true || err != nil {
    t.Error("Unable to delete Vertex properly. ", deleted)
  }
}

func TestDirectedAdjacencyMatrix_Contains(t *testing.T) {
  if testDAM.Contains("A") == false || testDAM.Contains("Z") == true {
    t.Error("Unable to detect contained Vertexes properly. ", testDAM)
  }
}

func TestDirectedAdjacencyMatrix_AddEdges(t *testing.T) {
  testDAM.AddEdges("B", "A")
  testDAM.AddEdge("A", "D")
  testDAM.AddEdges("A", "G")
  testDAM.AddEdges("B", "E")
  testDAM.AddEdges("E", "G")
  testDAM.AddEdges("B", "F")
  testDAM.AddEdges("F", "C")
  testDAM.AddEdges("H", "C")
  testDAM.AddEdges("D", "F")
  testDAM.AddEdges("F", "A")
}

func TestDirectedAdjacencyMatrix_AddEdge(t *testing.T) {
  if testDAM.HasEdge("A", "D") == false {
    t.Error("Unable to add edge properly. ", testDAM)
  }
}

func TestDirectedAdjacencyMatrix_HasEdge(t *testing.T) {
  fromIdx, toIdx := testDAM.GetEdgeIndex("A"), testDAM.GetEdgeIndex("D")
  if testDAM.Vertexes[fromIdx][toIdx] != 1 {
    t.Error("Unable to add Vertex properly. ", testDAM)
  }
}

func TestDirectedAdjacencyMatrix_HasAllEdges(t *testing.T) {
  fromIdx, toIdx := testDAM.GetEdgeIndex("A"), testDAM.GetEdgeIndex("B")
  if testDAM.Vertexes[fromIdx][toIdx] != 1 && testDAM.Vertexes[toIdx][fromIdx] != 1 {
    t.Error("Unable to add Vertex properly. ", testDAM)
  }
}

func TestDirectedAdjacencyMatrix_HasCycle(t *testing.T) {
  isCyclacle := testDAM.HasCycle()

  if isCyclacle == false {
    t.Error("Unable to detect cycle when present: ", isCyclacle)
  }
  testDAM.RemoveEdges("F", "A")
  isCyclacle = testDAM.HasCycle()

  if isCyclacle == true {
    t.Error("Detects cycle when none are present: ", isCyclacle)
  }
}

func TestDirectedAdjacencyMatrix_DFS(t *testing.T) {
  dfs_result := testDAM.DFS("A")
  dfs_expected := []string{"A", "G", "E", "B", "F", "C", "H", "D"}
  if len(dfs_result) != len(dfs_expected) {
    t.Error("Unable to do DFS properly. ", dfs_result, dfs_expected)
  }
}

func TestDirectedAdjacencyMatrix_BFS(t *testing.T) {
  bfs_result := testDAM.BFS("A")
  bfs_expected := []string{"A", "D", "B", "G", "F", "E", "C", "H"}
  if len(bfs_result) != len(bfs_expected) {
    t.Error("Unable to do BFS properly. ", bfs_result, bfs_expected)
  }
}
