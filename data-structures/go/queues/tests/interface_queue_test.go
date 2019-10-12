package tests

import (
  "testing"
  "google-interview-prep/data-structures/go/queues"
)

var queueInstance *queues.Queue

func TestQueue_Enqueue(t *testing.T) {
  queueInstance = &queues.Queue{
    Items: make([]interface{}, 0),
    Size: 0,
  }

  queueInstance.Enqueue("A")
  queueInstance.Enqueue("B")
  queueInstance.Enqueue("C")
  queueInstance.Enqueue("D")
  queueInstance.Enqueue("E")

  if queueInstance.Items[0] != "A" {
    t.Error("Item was not properly Enqueued: ", queueInstance.Items[0])
  }

  if queueInstance.Size != 5 {
    t.Error("Size was not incremented properly after Enqueueing: ", queueInstance.Size)
  }
}

func TestQueue_Dequeue(t *testing.T) {
  item := queueInstance.Dequeue()
  if item != "A" {
    t.Error("Item was not properly Dequeued: ", queueInstance.Items[0])
  }

  if queueInstance.Size != 4 {
    t.Error("Size was not decremented properly after Dequeueing: ", queueInstance.Size)
  }
}

func TestQueue_Peek(t *testing.T) {
  item := queueInstance.Peek()

  if item != "B" {
    t.Error("Peek doesn't return the value at the first item in the Queue: ", item)
  }
}

func TestQueue_IsEmpty(t *testing.T) {
  isEmpty := queueInstance.IsEmpty()

  if isEmpty == true {
    t.Error("Items are present however, IsEmpty returns true")
  }

  queueInstance.Dequeue()
  queueInstance.Dequeue()
  queueInstance.Dequeue()
  queueInstance.Dequeue()
  isEmpty = queueInstance.IsEmpty()

  if isEmpty == false {
    t.Error("Items are not present however, IsEmpty returns false")
  }
}
