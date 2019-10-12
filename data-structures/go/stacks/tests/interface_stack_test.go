package tests

import (
  "testing"
  "google-interview-prep/data-structures/go/stacks"
)

var interfaceStack *stacks.InterfaceStack

func TestInterfaceStack_Push(t *testing.T) {
  interfaceStack = &stacks.InterfaceStack{
    Items: make([]interface{}, 0),
    Size: 0,
  }

  interfaceStack.Push(1)
  if interfaceStack.Items[0] != 1 {
    t.Error("Push did not push correctly. Expected: 1, received: ", interfaceStack.Items[0])
  }

  interfaceStack.Push(2)
  if interfaceStack.Items[0] == 2 {
    t.Error("Push did not push correctly. Expected: 1, received: ", interfaceStack.Items[0])
  }

  interfaceStack.Push(3)
  if interfaceStack.Size != 3 {
    t.Error("Push did not increment size correctly. Expected: 3, received: ", interfaceStack.Size)
  }

  interfaceStack.Push(4)
  interfaceStack.Push(5)
  if interfaceStack.Items[interfaceStack.Size - 1] != 5 {
    t.Error("Push did not push correctly. Expected: 5, received: ", interfaceStack.Items[interfaceStack.Size - 1])
  }

}

func TestInterfaceStack_Pop(t *testing.T) {
  popped := interfaceStack.Pop()
  if popped != 5 {
    t.Error("Pop did not pop correctly. Expected: 5, received: ", popped)
  }

  if interfaceStack.Size != 4 {
    t.Error("Pop did decrement size correctly. Expected: 4, received: ", interfaceStack.Size)
  }
}

func TestInterfaceStack_Contains(t *testing.T) {
  contained := interfaceStack.Contains(3)
  if contained == false {
    t.Error("Contains did not find included element.")
  }

  contained = interfaceStack.Contains(100)
  if contained {
    t.Error("Contains found excluded element.")
  }
}

func TestInterfaceStack_Peek(t *testing.T) {
  if interfaceStack.Peek() != interfaceStack.Items[interfaceStack.Size - 1] {
    t.Error("Peek did not return top of stack")
  }
}

func TestInterfaceStack_Clone(t *testing.T) {
  cloned := interfaceStack.Clone()
  for i := 1; i < 5; i++ {
    if cloned.Contains(i) == false {
      t.Error("Cloned collection is missing element from original stack: ", i)
    }
  }
}

func TestInterfaceStack_Clear(t *testing.T) {
  interfaceStack.Clear()
  if interfaceStack.Size != 0 {
    t.Error("Clear did not reset size to 0")
  }
}
