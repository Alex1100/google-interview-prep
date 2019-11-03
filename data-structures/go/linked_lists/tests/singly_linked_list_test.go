package tests

import (
  "testing"
  "google-interview-prep/data-structures/go/linked_lists"
)

var intLinkedList *linked_lists.IntLinkedList
var stringLinkedList *linked_lists.StringLinkedList
var interfaceLinkedList *linked_lists.InterfaceLinkedList
var contained bool
var deleted interface{}

func TestSinglyLinkedList_Append(t *testing.T) {
  t.Run("Append - with type `int`", func(t *testing.T) {
    intLinkedList = ConstructIntLinkedList()
    intLinkedList.AppendInt(1)
    intLinkedList.AppendInt(2)
    if intLinkedList.Head.Next.Val != 2 {
      t.Error("Failed to Append to Int Linked List: ", intLinkedList.Head.Val)
    }
    intLinkedList.AppendInt(3)
  })

  t.Run("Append - with type `string`", func(t *testing.T) {
    stringLinkedList = ConstructStringLinkedList()
    stringLinkedList.AppendString("A")
    stringLinkedList.AppendString("B")
    if stringLinkedList.Head.Next.Val != "B" {
      t.Error("Failed to Append to String Linked List: ", stringLinkedList.Head.Val)
    }
    stringLinkedList.AppendString("C")
  })

  t.Run("Append - with type `interface{}`", func(t *testing.T) {
    interfaceLinkedList = ConstructInterfaceLinkedList()
    interfaceLinkedList.Append(1)
    interfaceLinkedList.Append("2")
    if interfaceLinkedList.Head.Next.Val != "2" {
      t.Error("Failed to Append to Interface Linked List: ", interfaceLinkedList.Head.Next.Val)
    }

    interfaceLinkedList.Append("3")
    if interfaceLinkedList.Head.Next.Next.Val != "3" {
      t.Error("Failed to Append to Interface Linked List: ", interfaceLinkedList.Head.Next.Next.Val)
    }
    interfaceLinkedList.Append(4.0)
    if interfaceLinkedList.Head.Next.Next.Next.Val != 4.0 {
      t.Error("Failed to Append to Interface Linked List: ", interfaceLinkedList.Head.Next.Next.Next.Val)
    }
  })
}

func TestSinglyLinkedList_Delete(t *testing.T) {
  t.Run("Delete - with type `int`", func(t *testing.T) {
    var modified *linked_lists.IntLinkedList
    deleted, modified = intLinkedList.DeleteInt(2)
    intLinkedList = modified
    if deleted != 2 || intLinkedList.Head.Val != 1 {
      t.Error("Failed to Delete from Int Linked List: ", deleted, intLinkedList.Head.Val)
    }
  })

  t.Run("Delete - with type `string`", func(t *testing.T) {
    var modified *linked_lists.StringLinkedList
    deleted, modified = stringLinkedList.DeleteString("C")
    stringLinkedList = modified
    if deleted != "C" || stringLinkedList.Head.Val != "A" {
      t.Error("Failed to Delete from String Linked List: ", deleted, stringLinkedList.Head.Val)
    }
  })

  t.Run("Delete - with type `interface{}`", func(t *testing.T) {
    var modified *linked_lists.InterfaceLinkedList
    deleted, modified = interfaceLinkedList.Delete(1)
    interfaceLinkedList = modified

    if deleted != 1 || interfaceLinkedList.Head.Val != "2" {
      t.Error("Failed to Delete from Interface Linked List: ", deleted, interfaceLinkedList.Head.Val)
    }
  })
}

func TestSinglyLinkedList_Contains(t *testing.T) {
  t.Run("Contains - with type `int`", func(t *testing.T) {
    contained = intLinkedList.ContainsInt(1)
    if !contained {
      t.Error("Failed to Find existing node from Int Linked List: ", contained, intLinkedList.Head.Val)
    }
    contained = intLinkedList.ContainsInt(2)
    if contained {
      t.Error("Found non-existing node from Int Linked List: ", contained)
    }
  })

  t.Run("Contains - with type `string`", func(t *testing.T) {
    contained = stringLinkedList.ContainsString("A")
    if !contained {
      t.Error("Failed to Find existing node from String Linked List: ", contained, stringLinkedList.Head.Val)
    }
    contained = stringLinkedList.ContainsString("C")
    if contained {
      t.Error("Found non-existing node from String Linked List: ", contained)
    }
  })

  t.Run("Contains - with type `interface{}`", func(t *testing.T) {
    contained = interfaceLinkedList.Contains("2")
    if !contained {
      t.Error("Failed to Find existing node from Interface Linked List: ", contained, interfaceLinkedList.Head.Val)
    }

    contained = interfaceLinkedList.Contains(1)
    if contained {
      t.Error("Found non-existing node from Interface Linked List: ", contained)
    }
  })
}
