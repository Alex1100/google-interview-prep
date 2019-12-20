func find132pattern(nums []int) bool {
    max := math.Inf(-1)
    stack := []int{}

    for i := len(nums) - 1; i >= 0; i-- {
        for len(stack) != 0 && nums[i] > stack[len(stack) - 1] {
            max = math.Max(max, float64(stack[len(stack) - 1]))
            stack = stack[:len(stack) - 1]
        }

        if max != math.Inf(-1) && nums[i] < int(max) && len(stack) != 0 {
            return true
        }

        if len(stack) == 0 || nums[i] < stack[len(stack) - 1] {
            stack = append(stack, nums[i])
        }
    }

    return false
}
