package main

import (
  "fmt"
)

func numJewelsInStones(J string, S string) int {
    counter := make(map[string]int)
    owned := 0

    for i := 0; i < len(J); i++ {
        counter[string(J[i])] = 1
    }

    for z := 0; z < len(S); z++ {
        if counter[string(S[z])] >= 1 {
            owned++
        }
    }

    return owned
}

func main() {
  fmt.Printf("Number of Jewels: %d\n", numJewelsInStones("aA", "aAAaAbtoiwkaWERREfepbbb"))
  fmt.Printf("Number of Jewels: %d\n", numJewelsInStones("z", "ZZazrowefeownz"))
}
