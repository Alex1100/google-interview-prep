package tests

import (
  "testing"
  "google-interview-prep/data-structures/go/linked_lists"
)

var intLinkedList *linked_lists.SinglyIntListNode
var stringLinkedList *linked_lists.SinglyStringListNode
var interfaceLinkedList *linked_lists.SinglyInterfaceListNode
var contained bool
var deleted interface{}

func TestSinglyLinkedList_Append(t *testing.T) {
  t.Run("Append - with type `int`", func(t *testing.T) {
    intLinkedList = &linked_lists.SinglyIntListNode{
      Val: 1,
      Next: nil,
    }
    intLinkedList.AppendInt(2)
    if intLinkedList.Next.Val != 2 {
      t.Error("Failed to Append to Int Linked List: ", intLinkedList.Val)
    }
    intLinkedList.AppendInt(3)
  })

  t.Run("Append - with type `string`", func(t *testing.T) {
    stringLinkedList = &linked_lists.SinglyStringListNode{
      Val: "A",
      Next: nil,
    }
    stringLinkedList.AppendString("B")
    if stringLinkedList.Next.Val != "B" {
      t.Error("Failed to Append to String Linked List: ", stringLinkedList.Val)
    }
    stringLinkedList.AppendString("C")
  })

  t.Run("Append - with type `interface{}`", func(t *testing.T) {
    interfaceLinkedList = &linked_lists.SinglyInterfaceListNode{
      Val: 1,
      Next: nil,
    }
    interfaceLinkedList.Append("2")
    if interfaceLinkedList.Next.Val != "2" {
      t.Error("Failed to Append to Interface Linked List: ", interfaceLinkedList.Next.Val)
    }

    interfaceLinkedList.Append("3")
    if interfaceLinkedList.Next.Next.Val != "3" {
      t.Error("Failed to Append to Interface Linked List: ", interfaceLinkedList.Next.Next.Val)
    }
    interfaceLinkedList.Append(4.0)
    if interfaceLinkedList.Next.Next.Next.Val != 4.0 {
      t.Error("Failed to Append to Interface Linked List: ", interfaceLinkedList.Next.Next.Next.Val)
    }
  })
}

func TestSinglyLinkedList_Delete(t *testing.T) {
  t.Run("Delete - with type `int`", func(t *testing.T) {
    var modified *linked_lists.SinglyIntListNode
    deleted, modified = intLinkedList.DeleteInt(2)
    intLinkedList = modified
    if deleted != 2 || intLinkedList.Val != 1 {
      t.Error("Failed to Delete from Int Linked List: ", deleted, intLinkedList.Val)
    }
  })

  t.Run("Delete - with type `string`", func(t *testing.T) {
    var modified *linked_lists.SinglyStringListNode
    deleted, modified = stringLinkedList.DeleteString("C")
    stringLinkedList = modified
    if deleted != "C" || stringLinkedList.Val != "A" {
      t.Error("Failed to Delete from String Linked List: ", deleted, stringLinkedList.Val)
    }
  })

  t.Run("Delete - with type `interface{}`", func(t *testing.T) {
    var modified *linked_lists.SinglyInterfaceListNode
    deleted, modified = interfaceLinkedList.Delete(1)
    interfaceLinkedList = modified

    if deleted != 1 || interfaceLinkedList.Val != "2" {
      t.Error("Failed to Delete from Interface Linked List: ", deleted, interfaceLinkedList.Val)
    }
  })
}

func TestSinglyLinkedList_Contains(t *testing.T) {
  t.Run("Contains - with type `int`", func(t *testing.T) {
    contained = intLinkedList.ContainsInt(1)
    if !contained {
      t.Error("Failed to Find existing node from Int Linked List: ", contained, intLinkedList.Val)
    }
    contained = intLinkedList.ContainsInt(2)
    if contained {
      t.Error("Found non-existing node from Int Linked List: ", contained)
    }
  })

  t.Run("Contains - with type `string`", func(t *testing.T) {
    contained = stringLinkedList.ContainsString("A")
    if !contained {
      t.Error("Failed to Find existing node from String Linked List: ", contained, stringLinkedList.Val)
    }
    contained = stringLinkedList.ContainsString("C")
    if contained {
      t.Error("Found non-existing node from String Linked List: ", contained)
    }
  })

  t.Run("Contains - with type `interface{}`", func(t *testing.T) {
    contained = interfaceLinkedList.Contains("2")
    if !contained {
      t.Error("Failed to Find existing node from Interface Linked List: ", contained, interfaceLinkedList.Val)
    }

    contained = interfaceLinkedList.Contains(1)
    if contained {
      t.Error("Found non-existing node from Interface Linked List: ", contained)
    }
  })
}
