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
  }
}

func (ln *SinglyStringListNode) AppendString(node string) {
  if ln == nil {
    ln = &SinglyStringListNode{
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
  }
}

func (ln *SinglyIntListNode) DeleteInt(node int) *SinglyIntListNode {
  if ln == nil {
    return nil
  }

  curr := ln
  toDelete := nil

  for curr != nil {
    if curr.Val == node {
      toDelete = curr
      return curr
    } else {
      curr = curr.Next
    }
  }

  return curr
}

func (ln *SinglyStringListNode) DeleteString(node string) *SinglyStringListNode {
  if ln == nil {
    return nil
  }

  curr := ln
  toDelete := nil

  for curr != nil {
    if curr.Val == node {
      toDelete = curr
      return curr
    } else {
      curr = curr.Next
    }
  }

  return curr
}

func (ln *SinglyInterfaceListNode) Delete(node interface{}) *SinglyInterfaceListNode {
  if ln == nil {
    return nil
  }

  curr := ln
  toDelete := nil

  for curr != nil {
    if curr.Val == node {
      toDelete = curr
      return curr
    } else {
      curr = curr.Next
    }
  }

  return curr
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
      return curr
    } else {
      curr = curr.Next
    }
  }

  return curr
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
      return curr
    } else {
      curr = curr.Next
    }
  }

  return curr
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
      return curr
    } else {
      curr = curr.Next
    }
  }

  return curr
}
