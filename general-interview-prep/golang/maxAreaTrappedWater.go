func maxArea(height []int) int {
    maxarea := 0
    l := 0
    r := len(height) - 1
    for l < r {
        maxarea = int(math.Max(float64(maxarea), math.Min(float64(height[l]), float64(height[r])) * float64(r - l)))
        if height[l] < height[r] {
            l++
        } else {
            r--
        }
    }

    return maxarea;
}
