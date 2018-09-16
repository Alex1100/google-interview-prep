package stack

type Stack struct {
	Items [][]int
	Size  int
}

func InitStack() *Stack {
	var items = make([][]int, 0)
	return &Stack{
		Items: items,
		Size:  0,
	}
}

func (s *Stack) Insert(item int) error {
	s.items = append(s.items, item)
	s.size++
	return nil
}

func (s *Stack) Pop() (string, error) {
	removed := s.items[len(s.items)-1]
	s.items = s.items[0 : len(s.items)-2]
	return removed, nil
}
