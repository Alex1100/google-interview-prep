package queues


type IntQueue struct {
  Items []int
  Size int
}

func (q *IntQueue) Enqueue(item int) {
  q.Items = append(q.Items, item)
  q.Size++
  return
}

func (q *IntQueue) Dequeue() int {
  item := q.Items[0]
  q.Items = q.Items[1:]
  q.Size--
  return item
}

func (q *IntQueue) Peek() int {
  return q.Items[0]
}

func (q *IntQueue) IsEmpty() bool {
  return q.Size == 0
}
