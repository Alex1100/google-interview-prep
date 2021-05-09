func numTeams(rating []int) int {
	res := 0
	for j := 1; j < len(rating); j++ {
		a, b, c, d := counts(rating, j)
		res += a*b + c*d
	}
	return res
}

func counts(nums []int, k int) (countSmallLeft, countBigRight, countBigLeft, countSmallRight int) {
	for i := 0; i < k; i++ {
		if nums[i] < nums[k] {
			countSmallLeft++
		} else if nums[i] != nums[k] {
			countBigLeft++
		}
	}
	for i := k + 1; i < len(nums); i++ {
		if nums[i] > nums[k] {
			countBigRight++
		} else if nums[i] != nums[k] {
			countSmallRight++
		}
	}
	return
}