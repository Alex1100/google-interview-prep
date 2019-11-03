package linked_lists

type IntLinkedList struct {
  Head *SinglyIntListNode
}

type StringLinkedList struct {
  Head *SinglyStringListNode
}

type InterfaceLinkedList struct {
  Head *SinglyInterfaceListNode
}

type SinglyIntListNode struct {
  Val int
  Next *SinglyIntListNode
}

type SinglyStringListNode struct {
  Val string
  Next *SinglyStringListNode
}

type SinglyInterfaceListNode struct {
  Val interface{}
  Next *SinglyInterfaceListNode
}

func ConstructIntLinkedList() *IntLinkedList {
  return &IntLinkedList{
    Head: &SinglyIntListNode{},
  }
}

func ConstructStringLinkedList() *StringLinkedList {
  return &StringLinkedList{
    Head: &SinglyStringListNode{},
  }
}

func ConstructInterfaceLinkedList() *InterfaceLinkedList {
  return &InterfaceLinkedList{
    Head: &SinglyInterfaceListNode{},
  }
}


func (ln *IntLinkedList) AppendInt(node int) {
  if ln.Head == nil {
    ln.Head = &SinglyIntListNode{
      Val: node,
      Next: nil,
    }
  } else {
    curr := ln.Head
    for curr.Next != nil {
      curr = curr.Next
    }

    curr.Next = &SinglyIntListNode{
      Val: node,
      Next: nil,
    }
  }
}

func (ln *StringLinkedList) AppendString(node string) {
  if ln.Head == nil {
    ln.Head = &SinglyStringListNode{
      Val: node,
      Next: nil,
    }
  } else {
    curr := ln.Head
    for curr.Next != nil {
      curr = curr.Next
    }

    curr.Next = &SinglyStringListNode{
      Val: node,
      Next: nil,
    }
  }
}

func (ln *InterfaceLinkedList) Append(node interface{}) {
  if ln.Head == nil {
    ln.Head = &SinglyInterfaceListNode{
      Val: node,
      Next: nil,
    }
  } else {
    curr := ln.Head
    for curr.Next != nil {
      curr = curr.Next
    }

    curr.Next = &SinglyInterfaceListNode{
      Val: node,
      Next: nil,
    }
  }
}

func (ln *IntLinkedList) DeleteInt(node int) (int, *IntLinkedList) {
  if ln.Head == nil {
    return -1, ln
  }

  curr := ln.Head
  head := curr
  toDelete := curr
  prev := curr

  if curr.Val == node {
    toDelete = curr
    curr = curr.Next
    return toDelete.Val, ln
  }

  for curr != nil {
    if curr.Val == node {
      toDelete = curr
      prev.Next = curr.Next
      curr = curr.Next
    } else {
      prev = curr
      curr = curr.Next
    }
  }

  // return toDelete.Val, head
  return toDelete.Val, ln
}

func (ln *StringLinkedList) DeleteString(node string) (string, *StringLinkedList) {
  if ln.Head == nil {
    return "", ln
  }

  curr := ln.Head
  head := curr
  toDelete := curr
  prev := curr

  if curr.Val == node {
    toDelete = curr
    curr = curr.Next
    return toDelete.Val, ln
  }

  for curr != nil {
    if curr.Val == node {
      toDelete = curr
      prev.Next = curr.Next
      curr = curr.Next
    } else {
      prev = curr
      curr = curr.Next
    }
  }

  // return toDelete.Val, head
  return toDelete.Val, ln
}

func (ln *InterfaceLinkedList) Delete(node interface{}) (interface{}, *InterfaceLinkedList) {
  if ln.Head == nil {
    return nil, ln
  }

  curr := ln.Head
  head := curr
  toDelete := curr
  prev := curr

  if curr.Val == node {
    toDelete = curr
    curr = curr.Next
    return toDelete.Val, ln
  }

  for curr != nil {
    if curr.Val == node {
      toDelete = curr
      prev.Next = curr.Next
      curr = curr.Next
    } else {
      prev = curr
      curr = curr.Next
    }
  }

  // return toDelete.Val, head
  return toDelete.Val, ln
}

func (ln *IntLinkedList) ContainsInt(node int) bool {
  if ln == nil {
    return false
  }

  curr := ln.Head
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

func (ln *StringLinkedList) ContainsString(node string) bool {
  if ln.Head == nil {
    return false
  }

  curr := ln.Head
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

func (ln *InterfaceLinkedList) Contains(node interface{}) bool {
  if ln.Head == nil {
    return false
  }

  curr := ln.Head
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
