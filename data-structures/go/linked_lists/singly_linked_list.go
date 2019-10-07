package linked_lists

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


func (ln *SinglyIntListNode) AppendInt(node int) {
  if ln == nil {
    ln = &SinglyIntListNode{
      Val: node,
      Next: nil,
    }
  } else {
    curr := ln
    for curr.Next != nil {
      curr = curr.Next
    }

    curr.Next = &SinglyIntListNode{
      Val: node,
      Next: nil,
    }
  }
}

func (ln *SinglyStringListNode) AppendString(node string) {
  if ln == nil {
    ln = &SinglyStringListNode{
      Val: node,
      Next: nil,
    }
  } else {
    curr := ln
    for curr.Next != nil {
      curr = curr.Next
    }

    curr.Next = &SinglyStringListNode{
      Val: node,
      Next: nil,
    }
  }
}

func (ln *SinglyInterfaceListNode) Append(node interface{}) {
  if ln == nil {
    ln = &SinglyInterfaceListNode{
      Val: node,
      Next: nil,
    }
  } else {
    curr := ln
    for curr.Next != nil {
      curr = curr.Next
    }

    curr.Next = &SinglyInterfaceListNode{
      Val: node,
      Next: nil,
    }
  }
}

func (ln *SinglyIntListNode) DeleteInt(node int) int {
  if ln == nil {
    return -1
  }

  curr := ln
  toDelete := curr
  prev := curr

  if curr.Val == node {
    toDelete = curr
    curr = curr.Next
    return toDelete.Val
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

  return toDelete.Val
}

func (ln *SinglyStringListNode) DeleteString(node string) string {
  if ln == nil {
    return ""
  }

  curr := ln
  toDelete := curr
  prev := curr

  if curr.Val == node {
    toDelete = curr
    curr = curr.Next
    return toDelete.Val
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

  return toDelete.Val
}

func (ln *SinglyInterfaceListNode) Delete(node interface{}) interface{} {
  if ln == nil {
    return nil
  }

  curr := ln
  toDelete := curr
  prev := curr

  if curr.Val == node {
    toDelete = curr
    curr = curr.Next
    return toDelete.Val
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

  return toDelete.Val
}

func (ln *SinglyIntListNode) ContainsInt(node int) bool {
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

func (ln *SinglyStringListNode) ContainsString(node string) bool {
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

func (ln *SinglyInterfaceListNode) Contains(node interface{}) bool {
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
