package tests

import (
  "testing"
  "google-interview-prep/data-structures/go/queues"
)

var stackQueueInstance *queues.StackQueue

func TestStackQueue_Enqueue(t *testing.T) {
  stackQueueInstance = &queues.StackQueue{
    FirstStack: &queues.Stack{
      Items: make([]interface{}, 0),
      Size: 0,
    },
    SecondStack: &queues.Stack{
      Items: make([]interface{}, 0),
      Size: 0,
    },
  }

  stackQueueInstance.Enqueue("A")
  stackQueueInstance.Enqueue("B")
  stackQueueInstance.Enqueue("C")
  stackQueueInstance.Enqueue("D")
  stackQueueInstance.Enqueue("E")

  if stackQueueInstance.SecondStack.Items[0] != "A" {
    t.Error("Item was not properly Enqueued: ", stackQueueInstance.SecondStack.Items[0])
  }

  if stackQueueInstance.SecondStack.Size != 5 {
    t.Error("Size was not incremented properly after Enqueueing: ", stackQueueInstance.SecondStack.Size)
  }
}

func TestStackQueue_Dequeue(t *testing.T) {
  item := stackQueueInstance.Dequeue()
  if item != "A" {
    t.Error("Item was not properly Dequeued: ", stackQueueInstance.FirstStack.Items[0])
  }

  if stackQueueInstance.FirstStack.Size != 4 {
    t.Error("Size was not decremented properly after Dequeueing: ", stackQueueInstance.FirstStack.Size)
  }
}

func TestStackQueue_Peek(t *testing.T) {
  item := stackQueueInstance.Peek()

  if item != "B" {
    t.Error("Peek doesn't return the value at the first item in the Queue: ", item)
  }
}

func TestStackQueue_IsEmpty(t *testing.T) {
  isEmpty := stackQueueInstance.IsEmpty()

  if isEmpty == true {
    t.Error("Items are present however, IsEmpty returns true")
  }

  stackQueueInstance.Dequeue()
  stackQueueInstance.Dequeue()
  stackQueueInstance.Dequeue()
  stackQueueInstance.Dequeue()
  isEmpty = stackQueueInstance.IsEmpty()

  if isEmpty == false {
    t.Error("Items are not present however, IsEmpty returns false")
  }
}
