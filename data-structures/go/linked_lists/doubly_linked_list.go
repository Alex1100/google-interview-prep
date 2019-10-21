package linked_lists

type DoublyIntListNode struct {
  Val int
  Next *DoublyIntListNode
  Prev *DoublyIntListNode
}

type DoublyStringListNode struct {
  Val string
  Next *DoublyStringListNode
  Prev *DoublyStringListNode
}

type DoublyInterfaceListNode struct {
  Val interface{}
  Next *DoublyInterfaceListNode
  Prev *DoublyInterfaceListNode
}

func (ln *DoublyIntListNode) AppendInt(node int) {
  if ln == nil {
    ln = &DoublyIntListNode{
      Val: node,
      Next: nil,
      Prev: nil,
    }
  } else {
    var prev *DoublyIntListNode

    curr := ln
    for curr.Next != nil {
      prev = curr
      curr = curr.Next
      curr.Prev = prev
    }

    prev = curr

    curr.Next = &DoublyIntListNode{
      Val: node,
      Next: nil,
      Prev: prev,
    }
  }
}

func (ln *DoublyStringListNode) AppendString(node string) {
  if ln == nil {
    ln = &DoublyStringListNode{
      Val: node,
      Next: nil,
      Prev: nil,
    }
  } else {
    var prev *DoublyStringListNode

    curr := ln
    for curr.Next != nil {
      prev = curr
      curr = curr.Next
      curr.Prev = prev
    }

    prev = curr

    curr.Next = &DoublyStringListNode{
      Val: node,
      Next: nil,
      Prev: prev,
    }
  }
}

func (ln *DoublyInterfaceListNode) Append(node interface{}) {
  if ln == nil {
    ln = &DoublyInterfaceListNode{
      Val: node,
      Next: nil,
      Prev: nil,
    }
  } else {
    var prev *DoublyInterfaceListNode

    curr := ln
    for curr.Next != nil {
      prev = curr
      curr = curr.Next
      curr.Prev = prev
    }

    prev = curr

    curr.Next = &DoublyInterfaceListNode{
      Val: node,
      Next: nil,
      Prev: prev,
    }
  }
}

func (ln *DoublyIntListNode) DeleteInt(node int) (int, *DoublyIntListNode) {
  if ln == nil {
    return -1, ln
  }

  curr := ln
  head := curr
  toDelete := curr
  prev := curr

  if curr.Val == node {
    toDelete = curr
    curr = curr.Next
    curr.Prev = nil
    return toDelete.Val, ln.Next
  }

  for curr.Next != nil {
    prev = curr.Prev
    if curr.Val == node {
      toDelete = curr
      prev.Next = curr.Next
      curr = curr.Next
      curr.Prev = prev
    } else {
      curr = curr.Next
    }
  }

  if node == curr.Val {
    toDelete = curr
    temp := curr.Prev
    curr.Prev.Next = nil
    curr.Prev.Prev.Next = temp
  }

  return toDelete.Val, head
}

func (ln *DoublyStringListNode) DeleteString(node string) (string, *DoublyStringListNode) {
  if ln == nil {
    return "", ln
  }

  curr := ln
  head := curr
  toDelete := curr
  prev := curr

  if curr.Val == node {
    toDelete = curr
    curr = curr.Next
    curr.Prev = nil
    return toDelete.Val, ln.Next
  }

  for curr.Next != nil {
    prev = curr.Prev
    if curr.Val == node {
      toDelete = curr
      prev.Next = curr.Next
      curr = curr.Next
      curr.Prev = prev
    } else {
      curr = curr.Next
    }
  }

  if node == curr.Val {
    toDelete = curr
    temp := curr.Prev
    curr.Prev.Next = nil
    curr.Prev.Prev.Next = temp
  }

  return toDelete.Val, head
}

func (ln *DoublyInterfaceListNode) Delete(node interface{}) (interface{}, *DoublyInterfaceListNode) {
  if ln == nil {
    return nil, ln
  }

  curr := ln
  head := curr
  toDelete := curr
  prev := curr

  if curr.Val == node {
    toDelete = curr
    curr = curr.Next
    curr.Prev = nil
    return toDelete.Val, ln.Next
  }

  for curr != nil {
    prev = curr.Prev
    if curr.Val == node {
      toDelete = curr
      prev.Next = curr.Next
      curr = curr.Next
      curr.Prev = prev
    } else {
      curr = curr.Next
    }
  }

  if node == curr.Val {
    toDelete = curr
    temp := curr.Prev
    curr.Prev.Next = nil
    curr.Prev.Prev.Next = temp
  }

  return toDelete.Val, head
}


// contains with a doubly node should be
// O(log n) time since we could go from left and right ends
func (ln *DoublyIntListNode) ContainsInt(node int) bool {
  if ln == nil {
    return false
  }

  curr := ln
  contained := false

  for curr != nil {
    if curr.Val == node {
      contained = true
      return contained
    } else {
      curr = curr.Next
    }
  }

  return contained
}

func (ln *DoublyStringListNode) ContainsString(node string) bool {
  if ln == nil {
    return false
  }

  curr := ln
  contained := false

  for curr != nil {
    if curr.Val == node {
      contained = true
      return contained
    } else {
      curr = curr.Next
    }
  }

  return contained
}

func (ln *DoublyInterfaceListNode) Contains(node interface{}) bool {
  if ln == nil {
    return false
  }

  curr := ln
  contained := false

  for curr != nil {
    if curr.Val == node {
      contained = true
      return contained
    } else {
      curr = curr.Next
    }
  }

  return contained
}
