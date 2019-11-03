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

func ConstructIntLinkedList(val int) *IntLinkedList {
  return &IntLinkedList{
    Head: &SinglyIntListNode{
      Val: val,
      Next: nil,
    },
  }
}

func ConstructStringLinkedList(val string) *StringLinkedList {
  return &StringLinkedList{
    Head: &SinglyStringListNode{
      Val: val,
      Next: nil,
    },
  }
}

func ConstructInterfaceLinkedList(val interface{}) *InterfaceLinkedList {
  return &InterfaceLinkedList{
    Head: &SinglyInterfaceListNode{
      Val: val,
      Next: nil,
    },
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

func (ln *IntLinkedList) DeleteInt(node int) *SinglyIntListNode {
  current := ln.Head
	prev := ln.Head
	var removed *SinglyIntListNode

  if current.Val == node && current.Next != nil {
		ln.Head = current.Next
		ln.Head.Next = current.Next.Next
		return current
	} else {
		for current.Next != nil {
			prev = current
			current = current.Next
			if current.Val == node {
				prev.Next = current.Next
				removed = current
				return removed
			}
		}

		return removed
	}
}

func (ln *StringLinkedList) DeleteString(node string) *SinglyStringListNode {
  current := ln.Head
	prev := ln.Head
	var removed *SinglyStringListNode

  if current.Val == node && current.Next != nil {
		ln.Head = current.Next
		ln.Head.Next = current.Next.Next
		return current
	} else {
		for current.Next != nil {
			prev = current
			current = current.Next
			if current.Val == node {
				prev.Next = current.Next
				removed = current
				return removed
			}
		}

		return removed
	}
}

func (ln *InterfaceLinkedList) Delete(node interface{}) *SinglyInterfaceListNode {
  current := ln.Head
	prev := ln.Head
	var removed *SinglyInterfaceListNode

  if current.Val == node && current.Next != nil {
		ln.Head = current.Next
		ln.Head.Next = current.Next.Next
		return current
	} else {
		for current.Next != nil {
			prev = current
			current = current.Next
			if current.Val == node {
				prev.Next = current.Next
				removed = current
				return removed
			}
		}

		return removed
	}
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
