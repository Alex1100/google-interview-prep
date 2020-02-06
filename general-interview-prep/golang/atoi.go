import (
    "fmt"
)

func myAtoi(str string) int {
    res, sign, idx := 0, 1, 0

    // Skip leading spaces
    for idx < len(str) && (str[idx] == ' ' || str[idx] == '\t') {
        idx++
    }

    // +/- Sign
    if idx < len(str) {
        if str[idx] == '+' {
            sign = 1
            idx++
        } else if str[idx] == '-' {
            sign = -1
            idx++
        }
    }

    // Numbers
    for idx < len(str) && str[idx] >= '0' && str[idx] <= '9'{
        res = res * 10 + int(str[idx]) - '0'
        if sign * res > math.MaxInt32 {
            return math.MaxInt32
        } else if sign * res < math.MinInt32 {
            return math.MinInt32
        }
        idx++
    }

    return res * sign
}
