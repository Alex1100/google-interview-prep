func highFive(items [][]int) [][]int {
	studentScores := map[int][]int{}
	students := []int{}
	resultMap := map[int]int{}
	result := [][]int{}

	for i := range items {
			if len(studentScores[items[i][0]]) == 0 {
					students = append(students, items[i][0])
			}
			studentScores[items[i][0]] = append(studentScores[items[i][0]], items[i][1])
	}
	
	sort.Ints(students)
	
	for z := 0; z < len(items); z++ {
			studentId := items[z][0]

			if len(studentScores[studentId]) > 0 {
					scores := studentScores[studentId]
					sort.Ints(scores)
					sum := 0
					scoreLength := len(scores)

					if len(scores) > 5 {
							scoreLength = 5
							scores = scores[len(scores) - 5:]
					}

					for i := 0; i < scoreLength; i++ {
							sum += scores[i]
					}

					resultMap[studentId] = sum / scoreLength
			}
	}
	
	for _, student := range students {
			result = append(result, []int{student, resultMap[student]})
	}
	
	return result
}