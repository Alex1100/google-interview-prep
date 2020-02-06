func dfs(A, B []string, pos, N int) int {
    if strings.Join(A, "") == strings.Join(B, "") {
        return 0
    }

    for A[pos] == B[pos] {
        pos += 1
    }

    minCnt := math.Inf(1)

    for i := pos + 1; i < N; i++ {
        if B[i] == A[pos] && B[i] != A[i] {
            B[i], B[pos] = B[pos], B[i]
            tmp := dfs(A, B, pos + 1, N) + 1
            minCnt = math.Min(float64(tmp), minCnt)
            B[i], B[pos] = B[pos], B[i]
        }
    }

    return int(minCnt)
}

func kSimilarity(A string, B string) int {
    N := len(A)
    aList := strings.Split(A, "")
    bList := strings.Split(B, "")
    return dfs(aList, bList, 0, N)
}
