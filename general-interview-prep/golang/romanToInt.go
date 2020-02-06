func romanToInt(s string) int {
    // define an object to be map
    ROMAN_NUMERALS := map[string]int{
        "I": 1,
        "V": 5,
        "X": 10,
        "L": 50,
        "C": 100,
        "D": 500,
        "M": 1000,
    }

	  // define a variable to record result
    sum := 0

    // loop string from end to start
    for i := len(s) - 1; i >= 0; i-- {
        // get current number and previous number according to the map
        current := ROMAN_NUMERALS[string(s[i])]
        prev := 0
        if i < len(s) - 1 {
            prev = ROMAN_NUMERALS[string(s[i + 1])]
        }

        // if previous number exists and current number less than privous one, sum minus current value
        // else sum plus current value
        if prev > 0 && (current < prev) {
            sum -= current
        } else {
            sum += current
        }
    }

    return sum
}
