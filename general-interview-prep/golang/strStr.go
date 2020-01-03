func strStr(haystack string, needle string) int {
    foundIndex := -1
    currentIndex := 0

    if needle == haystack {
        return 0
    }

    for len(haystack) - len(needle) >= currentIndex {
        if string(haystack[currentIndex:currentIndex + len(needle)]) == string(needle) {
            return currentIndex
        }
        currentIndex++
    }

    return foundIndex
}
