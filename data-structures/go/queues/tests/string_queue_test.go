package queues

import (
  "testing"
  queues "google-interview-prep/data-structures/go/queues"
)

var stringQueueInstance *queues.StringQueue

func TestStringQueue_Enqueue(t *testing.T) {
  stringQueueInstance = &queues.StringQueue{
    Items: make([]string, 0),
    Size: 0,
  }

  stringQueueInstance.Enqueue("A")
  stringQueueInstance.Enqueue("B")
  stringQueueInstance.Enqueue("C")
  stringQueueInstance.Enqueue("D")
  stringQueueInstance.Enqueue("E")

  if stringQueueInstance.Items[0] != "A" {
    t.Error("Item was not properly Enqueued: ", stringQueueInstance.Items[0])
  }

  if stringQueueInstance.Size != 5 {
    t.Error("Size was not incremented properly after Enqueueing: ", stringQueueInstance.Size)
  }
}

func TestStringQueue_Dequeue(t *testing.T) {
  item := stringQueueInstance.Dequeue()
  if item != "A" {
    t.Error("Item was not properly Dequeued: ", stringQueueInstance.Items[0])
  }

  if stringQueueInstance.Size != 4 {
    t.Error("Size was not decremented properly after Dequeueing: ", stringQueueInstance.Size)
  }
}

func TestStringQueue_Peek(t *testing.T) {
  item := stringQueueInstance.Peek()

  if item != "B" {
    t.Error("Peek doesn't return the value at the first item in the Queue: ", item)
  }
}

func TestStringQueue_IsEmpty(t *testing.T) {
  isEmpty := stringQueueInstance.IsEmpty()

  if isEmpty == true {
    t.Error("Items are present however, IsEmpty returns true")
  }

  stringQueueInstance.Dequeue()
  stringQueueInstance.Dequeue()
  stringQueueInstance.Dequeue()
  stringQueueInstance.Dequeue()
  isEmpty = stringQueueInstance.IsEmpty()

  if isEmpty == false {
    t.Error("Items are not present however, IsEmpty returns false")
  }
}
