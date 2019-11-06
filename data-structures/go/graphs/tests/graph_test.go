package tests

import (
  "testing"
  "google-interview-prep/data-structures/go/graphs"
)

var testGraph *graphs.Graph

func TestGraph_AddVertex(t *testing.T) {
  testGraph = graphs.ConstructGraph()
  testGraph.AddVertex("A")
  testGraph.AddVertex("B")
  testGraph.AddVertex("C")
  testGraph.AddVertex("D")
  testGraph.AddVertex("E")
  testGraph.AddVertex("F")
  testGraph.AddVertex("G")
  testGraph.AddVertex("H")
  testGraph.AddVertex("Z")

  if testGraph.Vertexes["A"].Point != "A" {
    t.Error("Unable to add Vertex properly. ", testGraph)
  }
}

func TestGraph_RemoveVertex(t *testing.T) {
  deleted, err := testGraph.RemoveVertex("Z")
  if deleted.Point != "Z" || err != nil {
    t.Error("Unable to delete Vertex properly. ", deleted)
  }
}

func TestGraph_Contains(t *testing.T) {
  if testGraph.Contains("A") == false || testGraph.Contains("Z") == true {
    t.Error("Unable to detect contained Vertexes properly. ", testGraph)
  }
}

func TestGraph_AddEdges(t *testing.T) {
  testGraph.AddEdges("B", "A");
  testGraph.AddEdge("A", "D");
  testGraph.AddEdges("A", "G");
  testGraph.AddEdges("B", "E");
  testGraph.AddEdges("E", "G");
  testGraph.AddEdges("B", "F");
  testGraph.AddEdges("F", "C");
  testGraph.AddEdges("H", "C");
  testGraph.AddEdges("D", "F");
  if testGraph.HasAllEdges("B", "A") == false {
    t.Error("Unable to add edges properly. ", testGraph)
  }
}

func TestGraph_AddEdge(t *testing.T) {
  if testGraph.HasEdge("A", "D") == false {
    t.Error("Unable to add edge properly. ", testGraph)
  }
}

func TestGraph_HasEdge(t *testing.T) {
  if testGraph.Vertexes["A"].Edges["D"].To.Point != "D" {
    t.Error("Unable to add Vertex properly. ", testGraph)
  }
}

func TestGraph_HasAllEdges(t *testing.T) {
  if testGraph.Vertexes["A"].Edges["B"].To.Point != "B" && testGraph.Vertexes["B"].Edges["A"].To.Point != "A" {
    t.Error("Unable to add Vertex properly. ", testGraph)
  }
}

func TestGraph_DFS(t *testing.T) {
  dfs_result := testGraph.DFS("A")
  dfs_expected := []string{"A", "G", "E", "B", "F", "C", "H", "D"}
  if len(dfs_result) != len(dfs_expected) {
    t.Error("Unable to do DFS properly. ", dfs_result, dfs_expected)
  }
}

func TestGraph_BFS(t *testing.T) {
  bfs_result := testGraph.BFS("A")
  bfs_expected := []string{"A", "D", "B", "G", "F", "E", "C", "H"}
  if len(bfs_result) != len(bfs_expected) {
    t.Error("Unable to do BFS properly. ", bfs_result, bfs_expected)
  }
}
