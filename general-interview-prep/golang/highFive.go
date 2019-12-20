Given a list of scores of different students, return the average score of each student's top five scores in the order of each student's id.

Each entry items[i] has items[i][0] the student's id, and items[i][1] the student's score.  The average score is calculated using integer division.



Example 1:

Input: [[1,91],[1,92],[2,93],[2,97],[1,60],[2,77],[1,65],[1,87],[1,100],[2,100],[2,76]]
Output: [[1,87],[2,88]]
Explanation:
The average of the student with id = 1 is 87.
The average of the student with id = 2 is 88.6. But with integer division their average converts to 88.


Note:

1 <= items.length <= 1000
items[i].length == 2
The IDs of the students is between 1 to 1000
The score of the students is between 1 to 100
For each student, there are at least 5 scores

func highFive(items [][]int) [][]int {
    studentScores := map[int][]int{}
    averages := [][]int{}

    for i := range items {
        studentScores[items[i][0]] = append(studentScores[items[i][0]], items[i][1])
    }


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

            averages = append(averages, []int{studentId, sum / scoreLength})

            delete(studentScores, studentId)
        }
    }

    return averages
}
