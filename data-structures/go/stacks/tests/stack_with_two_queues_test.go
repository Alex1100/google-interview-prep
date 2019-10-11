package tests

import (
  "testing"
  stacks "google-interview-prep/data-structures/go/stacks"
)

var queueStack *stacks.QueueStack

func TestQueueStack_Push(t *testing.T) {
  queueStack = &stacks.QueueStack{
    FirstQueue: &stacks.Queue{
      Items: make([]interface{}, 0),
      Size: 0,
    },
    SecondQueue: &stacks.Queue{
      Items: make([]interface{}, 0),
      Size: 0,
    },
  }

  queueStack.Push(1)
  if queueStack.SecondQueue.Items[0] != 1 {
    t.Error("Push did not push correctly. Expected: 1, received: ", queueStack.SecondQueue.Items[0])
  }

  queueStack.Push(2)
  if queueStack.SecondQueue.Items[0] == 2 {
    t.Error("Push did not push correctly. Expected: 1, received: ", queueStack.SecondQueue.Items[0])
  }

  queueStack.Push(3)
  if queueStack.SecondQueue.Size != 3 {
    t.Error("Push did not increment size correctly. Expected: 3, received: ", queueStack.SecondQueue.Size)
  }

  queueStack.Push(4)
  queueStack.Push(5)
  if queueStack.SecondQueue.Items[queueStack.SecondQueue.Size - 1] != 5 {
    t.Error("Push did not push correctly. Expected: 5, received: ", queueStack.SecondQueue.Items[queueStack.SecondQueue.Size - 1])
  }

}

func TestQueueStack_Pop(t *testing.T) {
  popped := queueStack.Pop()
  if popped != 5 {
    t.Error("Pop did not pop correctly. Expected: 5, received: ", popped)
  }

  if queueStack.FirstQueue.Size != 4 {
    t.Error("Pop did decrement size correctly. Expected: 4, received: ", queueStack.FirstQueue.Size)
  }
}

func TestQueueStack_Contains(t *testing.T) {
  contained := queueStack.Contains(3)
  if contained == false {
    t.Error("Contains did not find included element.")
  }

  contained = queueStack.Contains(100)
  if contained {
    t.Error("Contains found excluded element.")
  }
}

func TestQueueStack_Peek(t *testing.T) {
  if queueStack.Peek() != queueStack.FirstQueue.Items[queueStack.FirstQueue.Size - 1] {
    t.Error("Peek did not return top of stack")
  }
}

func TestQueueStack_Clone(t *testing.T) {
  cloned := queueStack.Clone()
  for i := 1; i < 5; i++ {
    if cloned.Contains(i) == false {
      t.Error("Cloned collection is missing element from original stack: ", i)
    }
  }
}

func TestQueueStack_Clear(t *testing.T) {
  queueStack.Clear()
  if queueStack.SecondQueue.Size != 0 {
    t.Error("Clear did not reset size to 0")
  }
}
