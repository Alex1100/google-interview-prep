package main

func backspaceCompare(S string, T string) bool {
	s, t := toArray(S), toArray(T)
	if len(s) != len(t) {
		return false
	}
	for i := 0; i < len(s); i++ {
		if s[i] != t[i] {
			return false
		}
	}
	return true
}

func toArray(S string) []byte {
	var s []byte
	for i := 0; i < len(S); i++ {
		switch S[i] {
		case '#':
			if len(s) > 0 {
				s = s[:len(s)-1]
			}
		default:
			s = append(s, S[i])
		}
	}
	return s
}

func main() {
  fmt.Println(backspaceCompare("ab#c", "ad#c"))
}
