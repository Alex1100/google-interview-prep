func gcdOfStrings(str1 string, str2 string) string {
	gcd := findGCD(len(str1), len(str2))
	
	
	for gcd > 0 {
			if str1[:gcd] == str2[:gcd] {
					pattern := []rune(str1[:gcd])
					candidate1 := make([]rune, 0, len(str1))
					candidate2 := make([]rune, 0, len(str2))
					
					for i := 0; i < (len(str1)/gcd); i++ {
							candidate1 = append(candidate1, pattern...)
					}
					
					for i := 0; i < (len(str2)/gcd); i++ {
							candidate2 = append(candidate2, pattern...)
					}
					
					if strings.Compare(string(candidate1), str1) == 0 && strings.Compare(string(candidate2), str2) == 0 {
							return string(pattern)

					}     
			}
			gcd--
	}
	return ""    
}

func findGCD(len1, len2 int) int {
	greater := len1
	lesser := len2
	
	if len1 < len2 {
			greater = len2
			lesser = len1
	}
	
	for lesser != 0 && greater % lesser != 0 {
			greater, lesser = lesser, (greater%lesser)
	}
	
	return lesser
}