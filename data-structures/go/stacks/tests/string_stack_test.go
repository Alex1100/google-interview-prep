package tests

import (
  "testing"
  "strconv"
  stacks "google-interview-prep/data-structures/go/stacks"
)

var stringStack *stacks.StringStack

func TestStringStack_Push(t *testing.T) {
  stringStack = &stacks.StringStack{
    Items: make([]string, 0),
    Size: 0,
  }

  stringStack.Push("1")
  if stringStack.Items[0] != "1" {
    t.Error("Push did not push correctly. Expected: 1, received: ", stringStack.Items[0])
  }

  stringStack.Push("2")
  if stringStack.Items[0] == "2" {
    t.Error("Push did not push correctly. Expected: 1, received: ", stringStack.Items[0])
  }

  stringStack.Push("3")
  if stringStack.Size != 3 {
    t.Error("Push did not increment size correctly. Expected: 3, received: ", stringStack.Size)
  }

  stringStack.Push("4")
  stringStack.Push("5")
  if stringStack.Items[stringStack.Size - 1] != "5" {
    t.Error("Push did not push correctly. Expected: 5, received: ", stringStack.Items[stringStack.Size - 1])
  }

}

func TestStringStack_Pop(t *testing.T) {
  popped := stringStack.Pop()
  if popped != "5" {
    t.Error("Pop did not pop correctly. Expected: 5, received: ", popped)
  }

  if stringStack.Size != 4 {
    t.Error("Pop did decrement size correctly. Expected: 4, received: ", stringStack.Size)
  }
}

func TestStringStack_Contains(t *testing.T) {
  contained := stringStack.Contains("3")
  if contained == false {
    t.Error("Contains did not find included element.")
  }

  contained = stringStack.Contains("100")
  if contained {
    t.Error("Contains found excluded element.")
  }
}

func TestStringStack_Peek(t *testing.T) {
  if stringStack.Peek() != stringStack.Items[stringStack.Size - 1] {
    t.Error("Peek did not return top of stack")
  }
}

func TestStringStack_Clone(t *testing.T) {
  cloned := stringStack.Clone()
  for i := 1; i < 5; i++ {
    if cloned.Contains(strconv.Itoa(i)) == false {
      t.Error("Cloned collection is missing element from original stack: ", i)
    }
  }
}

func TestStringStack_Clear(t *testing.T) {
  stringStack.Clear()
  if stringStack.Size != 0 {
    t.Error("Clear did not reset size to 0")
  }
}
