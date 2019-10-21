package tests

import (
  "testing"
  "google-interview-prep/data-structures/go/linked_lists"
)

var intDoublyLinkedList *linked_lists.DoublyIntListNode
var stringDoublyLinkedList *linked_lists.DoublyStringListNode
var interfaceDoublyLinkedList *linked_lists.DoublyInterfaceListNode

func TestDoublyLinkedList_Append(t *testing.T) {
  t.Run("Append - with type `int`", func(t *testing.T) {
    intDoublyLinkedList = &linked_lists.DoublyIntListNode{
      Val: 1,
      Next: nil,
      Prev: nil,
    }
    intDoublyLinkedList.AppendInt(2)
    if intDoublyLinkedList.Next.Val != 2 {
      t.Error("Failed to Append to Int Linked List: ", intDoublyLinkedList.Val)
    }

    if intDoublyLinkedList.Next.Prev.Val != 1 {
      t.Error("Failed to Append to Int Linked List: ", intDoublyLinkedList.Next.Prev.Val)
    }
    intDoublyLinkedList.AppendInt(3)
  })

  t.Run("Append - with type `string`", func(t *testing.T) {
    stringDoublyLinkedList = &linked_lists.DoublyStringListNode{
      Val: "A",
      Next: nil,
      Prev: nil,
    }
    stringDoublyLinkedList.AppendString("B")
    if stringDoublyLinkedList.Next.Val != "B" {
      t.Error("Failed to Append to String Linked List: ", stringDoublyLinkedList.Val)
    }

    if stringDoublyLinkedList.Next.Prev.Val != "A" {
      t.Error("Failed to Append to String Linked List: ", stringDoublyLinkedList.Next.Prev.Val)
    }
    stringDoublyLinkedList.AppendString("C")
  })

  t.Run("Append - with type `interface{}`", func(t *testing.T) {
    interfaceDoublyLinkedList = &linked_lists.DoublyInterfaceListNode{
      Val: 1,
      Next: nil,
      Prev: nil,
    }
    interfaceDoublyLinkedList.Append("2")
    if interfaceDoublyLinkedList.Next.Val != "2" {
      t.Error("Failed to Append to Interface Linked List: ", interfaceDoublyLinkedList.Next.Val)
    }

    if interfaceDoublyLinkedList.Next.Prev.Val != 1 {
      t.Error("Failed to Append to Interface Linked List: ", interfaceDoublyLinkedList.Next.Prev.Val)
    }

    interfaceDoublyLinkedList.Append("3")
    if interfaceDoublyLinkedList.Next.Next.Val != "3" {
      t.Error("Failed to Append to Interface Linked List: ", interfaceDoublyLinkedList.Next.Next.Val)
    }

    if interfaceDoublyLinkedList.Next.Next.Prev.Val != "2" {
      t.Error("Failed to Append to Interface Linked List: ", interfaceDoublyLinkedList.Next.Next.Prev.Val)
    }
    interfaceDoublyLinkedList.Append(4.0)
    if interfaceDoublyLinkedList.Next.Next.Next.Val != 4.0 {
      t.Error("Failed to Append to Interface Linked List: ", interfaceDoublyLinkedList.Next.Next.Next.Val)
    }

    if interfaceDoublyLinkedList.Next.Next.Next.Prev.Val != "3" {
      t.Error("Failed to Append to Interface Linked List: ", interfaceDoublyLinkedList.Next.Next.Next.Prev.Val)
    }
  })
}

func TestDoublyLinkedList_Delete(t *testing.T) {
  t.Run("Delete - with type `int`", func(t *testing.T) {
    doubly_deleted, modifiedIntList := intDoublyLinkedList.DeleteInt(2)
    intDoublyLinkedList = modifiedIntList

    if doubly_deleted != 2 || modifiedIntList.Val != 1 {
      t.Error("Failed to Delete from Int Linked List: ", doubly_deleted, modifiedIntList.Val)
    }
  })

  t.Run("Delete - with type `string`", func(t *testing.T) {
    doubly_deleted, modifiedStringList := stringDoublyLinkedList.DeleteString("C")
    stringDoublyLinkedList = modifiedStringList

    if doubly_deleted != "C" || modifiedStringList.Val != "A" {
      t.Error("Failed to Delete from String Linked List: ", doubly_deleted, modifiedStringList.Val)
    }
  })

  t.Run("Delete - with type `interface{}`", func(t *testing.T) {
    doubly_deleted, modified := interfaceDoublyLinkedList.Delete(1)
    interfaceDoublyLinkedList = modified
    
    if doubly_deleted != 1 || modified.Val != "2" {
      t.Error("Failed to Delete from Interface Linked List: ", doubly_deleted, modified.Val)
    }
  })
}

func TestDoublyLinkedList_Contains(t *testing.T) {
  t.Run("Contains - with type `int`", func(t *testing.T) {
    doubly_contained := intDoublyLinkedList.ContainsInt(1)
    if !doubly_contained {
      t.Error("Failed to Find existing node from Int Linked List: ", doubly_contained, intDoublyLinkedList.Val)
    }
    doubly_contained = intDoublyLinkedList.ContainsInt(2)
    if doubly_contained {
      t.Error("Found non-existing node from Int Linked List: ", doubly_contained)
    }
  })

  t.Run("Contains - with type `string`", func(t *testing.T) {
    doubly_contained := stringDoublyLinkedList.ContainsString("A")
    if !doubly_contained {
      t.Error("Failed to Find existing node from String Linked List: ", doubly_contained, stringDoublyLinkedList.Val)
    }
    doubly_contained = stringDoublyLinkedList.ContainsString("C")
    if doubly_contained {
      t.Error("Found non-existing node from String Linked List: ", doubly_contained)
    }
  })

  t.Run("Contains - with type `interface{}`", func(t *testing.T) {
    doubly_contained := interfaceDoublyLinkedList.Contains("2")
    if !doubly_contained {
      t.Error("Failed to Find existing node from Interface Linked List: ", doubly_contained, interfaceDoublyLinkedList.Val)
    }

    doubly_contained = interfaceDoublyLinkedList.Contains(1)
    if doubly_contained {
      t.Error("Found non-existing node from Interface Linked List: ", doubly_contained)
    }
  })
}
