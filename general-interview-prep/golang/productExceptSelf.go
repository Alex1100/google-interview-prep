func productExceptSelf(nums []int) []int {
	n := len(nums)
	
	res := make([]int, n)
	for i := 0; i < n; i++ {
			res[i] = 1
	}
	
	for i := 1; i < n; i++ {
			res[i] = res[i - 1] * nums[i - 1]
	}

	right := 1
	
	for i := n - 1; i >= 0; i-- {
			res[i] *= right
			right *= nums[i]
	}
	
	return res
}