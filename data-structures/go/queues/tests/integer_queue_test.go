package queues

import (
  "testing"
  queues "google-interview-prep/data-structures/go/queues"
)

var intQueueInstance *queues.IntQueue

func TestIntegerQueue_Enqueue(t *testing.T) {
  intQueueInstance = &queues.IntQueue{
    Items: make([]int, 0),
    Size: 0,
  }

  intQueueInstance.Enqueue(120)
  intQueueInstance.Enqueue(121)
  intQueueInstance.Enqueue(122)
  intQueueInstance.Enqueue(123)
  intQueueInstance.Enqueue(124)

  if intQueueInstance.Items[0] != 120 {
    t.Error("Item was not properly Enqueued: ", intQueueInstance.Items[0])
  }

  if intQueueInstance.Size != 5 {
    t.Error("Size was not incremented properly after Enqueueing: ", intQueueInstance.Size)
  }
}

func TestIntegerQueue_Dequeue(t *testing.T) {
  item := intQueueInstance.Dequeue()
  if item != 120 {
    t.Error("Item was not properly Dequeued: ", intQueueInstance.Items[0])
  }

  if intQueueInstance.Size != 4 {
    t.Error("Size was not decremented properly after Dequeueing: ", intQueueInstance.Size)
  }
}

func TestIntegerQueue_Peek(t *testing.T) {
  item := intQueueInstance.Peek()

  if item != 121 {
    t.Error("Peek doesn't return the value at the first item in the Queue: ", item)
  }
}

func TestIntegerQueue_IsEmpty(t *testing.T) {
  isEmpty := intQueueInstance.IsEmpty()

  if isEmpty == true {
    t.Error("Items are present however, IsEmpty returns true")
  }

  intQueueInstance.Dequeue()
  intQueueInstance.Dequeue()
  intQueueInstance.Dequeue()
  intQueueInstance.Dequeue()
  isEmpty = intQueueInstance.IsEmpty()

  if isEmpty == false {
    t.Error("Items are not present however, IsEmpty returns false")
  }
}
