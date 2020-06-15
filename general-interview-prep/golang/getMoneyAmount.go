package main

func getMoneyAmount(n int) int {
        dp := make([][]int, n+1)

        for i := 0; i < len(dp); i++ {
            dp[i] = make([]int, n+1)
            for j:= 0; j < len(dp[i]); j++ {
                dp[i][j] = 0
            }
        }

        for ln:=2; ln <= n; ln++ {
            for start:=1; start <= n - ln + 1; start++ {
                minres := int((uint(1)<<uint(31) - 1))
                for piv := start; piv < start + ln - 1; piv++ {
                    res:= piv
                    mx := dp[start][piv - 1]
                    if mx < dp[piv+1][start+ln-1] {
                        mx = dp[piv+1][start+ln-1]
                    }
                    res += mx
                    if minres > res {
                        minres = res
                    }
                }
                dp[start][start+ln - 1] = minres
            }
        }
        return dp[1][n]
}
