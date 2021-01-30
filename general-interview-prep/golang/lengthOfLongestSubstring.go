func lengthOfLongestSubstring(s string) int {
	n := len(s)
	ans := 0
	
	mp := map[string]int{}
	
	i := 0
	
	for j := 0; j <  n; j++ {
			if mp[string(s[j])] != 0 {
					i = int(math.Max(float64(mp[string(s[j])]), float64(i)))
			}
			
			ans = int(math.Max(float64(ans), float64((j - i) + 1)))
			mp[string(s[j])] = j + 1
	}
	
	return ans
}