package tests

import (
  "testing"
  stacks "google-interview-prep/data-structures/go/stacks"
)

var integerStack *stacks.IntStack

func TestIntegerStack_Push(t *testing.T) {
  integerStack = &stacks.IntStack{
    Items: make([]int, 0),
    Size: 0,
  }

  integerStack.Push(1)
  if integerStack.Items[0] != 1 {
    t.Error("Push did not push correctly. Expected: 1, received: ", integerStack.Items[0])
  }

  integerStack.Push(2)
  if integerStack.Items[0] == 2 {
    t.Error("Push did not push correctly. Expected: 1, received: ", integerStack.Items[0])
  }

  integerStack.Push(3)
  if integerStack.Size != 3 {
    t.Error("Push did not increment size correctly. Expected: 3, received: ", integerStack.Size)
  }

  integerStack.Push(4)
  integerStack.Push(5)
  if integerStack.Items[integerStack.Size - 1] != 5 {
    t.Error("Push did not push correctly. Expected: 5, received: ", integerStack.Items[integerStack.Size - 1])
  }

}

func TestIntegerStack_Pop(t *testing.T) {
  popped := integerStack.Pop()
  if popped != 5 {
    t.Error("Pop did not pop correctly. Expected: 5, received: ", popped)
  }

  if integerStack.Size != 4 {
    t.Error("Pop did decrement size correctly. Expected: 4, received: ", integerStack.Size)
  }
}

func TestIntegerStack_Contains(t *testing.T) {
  contained := integerStack.Contains(3)
  if contained == false {
    t.Error("Contains did not find included element.")
  }

  contained = integerStack.Contains(100)
  if contained {
    t.Error("Contains found excluded element.")
  }
}

func TestIntegerStack_Peek(t *testing.T) {
  if integerStack.Peek() != integerStack.Items[integerStack.Size - 1] {
    t.Error("Peek did not return top of stack")
  }
}

func TestIntegerStack_Clone(t *testing.T) {
  cloned := integerStack.Clone()
  for i := 1; i < 5; i++ {
    if cloned.Contains(i) == false {
      t.Error("Cloned collection is missing element from original stack: ", i)
    }
  }
}

func TestIntegerStack_Clear(t *testing.T) {
  integerStack.Clear()
  if integerStack.Size != 0 {
    t.Error("Clear did not reset size to 0")
  }
}
