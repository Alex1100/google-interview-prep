func twoSumII(numbers []int, target int) []int {
    seen := map[int]int{}
    result := []int{}

    for i := range numbers {
        v, found := seen[numbers[i]];
        if found {
            result = []int{v + 1, i + 1}
        }
        seen[target - numbers[i]] = i
    }

    return result
}
