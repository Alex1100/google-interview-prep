func ladderLength(beginWord string, endWord string, wordList []string) int {
	m := make(map[string]bool)

	for _, v := range wordList {
		m[v] = true
	}

	list := []string{beginWord}
    // required steps
	rst := 1

	for len(list) != 0 {
		listLength := len(list)
		for i := 0; i < listLength; i ++ {
			word := list[0]
			list = list[1:]

			if word == endWord {
				return rst
			}

			m[word] = false
			for i := range word {
				for j := 0; j < 26; j++ {
					tmp := []rune(word)
					tmp[i] = rune('a' + j)
					ts := string(tmp)
					v, ok := m[ts]

                    if ok && v && ((len(list) != 0 && ts != list[len(list) - 1]) || len(list) == 0) {
						list = append(list, ts)
					}
				}
			}
		}

		rst++
	}

	return 0
}
