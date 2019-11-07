package tests

import (
  "testing"
  "google-interview-prep/data-structures/go/graphs"
)

var testAM *graphs.AM

func TestAdjacencyMatrix_AddVertex(t *testing.T) {
  testAM = graphs.ConstructAM()
  testAM.AddVertex("A")
  testAM.AddVertex("B")
  testAM.AddVertex("C")
  testAM.AddVertex("D")
  testAM.AddVertex("E")
  testAM.AddVertex("F")
  testAM.AddVertex("G")
  testAM.AddVertex("H")
  testAM.AddVertex("Z")

  fromIdx := testAM.GetEdgeIndex("A")

  if testAM.VertexList[fromIdx] != "A" {
    t.Error("Unable to add Vertex properly. ", testAM.VertexList[fromIdx])
  }
}

func TestAdjacencyMatrix_RemoveVertex(t *testing.T) {
  deleted, err := testAM.RemoveVertex("Z")
  if deleted != true || err != nil {
    t.Error("Unable to delete Vertex properly. ", deleted)
  }
}

func TestAdjacencyMatrix_Contains(t *testing.T) {
  if testAM.Contains("A") == false || testAM.Contains("Z") == true {
    t.Error("Unable to detect contained Vertexes properly. ", testAM)
  }
}

func TestAdjacencyMatrix_AddEdges(t *testing.T) {
  testAM.AddEdges("B", "A");
  testAM.AddEdge("A", "D");
  testAM.AddEdges("A", "G");
  testAM.AddEdges("B", "E");
  testAM.AddEdges("E", "G");
  testAM.AddEdges("B", "F");
  testAM.AddEdges("F", "C");
  testAM.AddEdges("H", "C");
  testAM.AddEdges("D", "F");
  if testAM.HasAllEdges("B", "A") == false {
    t.Error("Unable to add edges properly. ", testAM)
  }
}

func TestAdjacencyMatrix_AddEdge(t *testing.T) {
  if testAM.HasEdge("A", "D") == false {
    t.Error("Unable to add edge properly. ", testAM)
  }
}

func TestAdjacencyMatrix_HasEdge(t *testing.T) {
  fromIdx, toIdx := testAM.GetEdgeIndex("A"), testAM.GetEdgeIndex("D")
  if testAM.Vertexes[fromIdx][toIdx] != 1 {
    t.Error("Unable to add Vertex properly. ", testAM)
  }
}

func TestAdjacencyMatrix_HasAllEdges(t *testing.T) {
  fromIdx, toIdx := testAM.GetEdgeIndex("A"), testAM.GetEdgeIndex("B")
  if testAM.Vertexes[fromIdx][toIdx] != 1 && testAM.Vertexes[toIdx][fromIdx] != 1 {
    t.Error("Unable to add Vertex properly. ", testAM)
  }
}

func TestAdjacencyMatrix_DFS(t *testing.T) {
  dfs_result := testAM.DFS("A")
  dfs_expected := []string{"A", "G", "E", "B", "F", "C", "H", "D"}
  if len(dfs_result) != len(dfs_expected) {
    t.Error("Unable to do DFS properly. ", dfs_result, dfs_expected)
  }
}

func TestAdjacencyMatrix_BFS(t *testing.T) {
  bfs_result := testAM.BFS("A")
  bfs_expected := []string{"A", "D", "B", "G", "F", "E", "C", "H"}
  if len(bfs_result) != len(bfs_expected) {
    t.Error("Unable to do BFS properly. ", bfs_result, bfs_expected)
  }
}
