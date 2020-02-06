package main

import "fmt"

// https://code.dennyzhang.com/maximum-frequency-stack
// Basic Ideas: hashmap + array
//
// Each frequency is a list.
// The tail of list with max freq is the target
//
// freqs map[int]int: freqs of each uniq item
// group map[int][]int: elements has a given frequency
//
// When push a element, update both hashmap
// When pop a element, update both hashmap
//
// Complexity: Time O(1) Space O(n)
type FreqStack struct {
    maxFreq int
    freqs map[int]int
    group map[int][]int
    size int
}

func Constructor() FreqStack {
    return FreqStack{
        maxFreq: 0,
        freqs: map[int]int{},
        group: map[int][]int{},
        size: 0,
    }
}

func (this *FreqStack) Push(x int)  {
    this.freqs[x]++
    cnt := this.freqs[x]
    // Notice: no need to remove from previous freq list!
    this.group[cnt] = append(this.group[cnt], x)
    if this.maxFreq < cnt {
        this.maxFreq = cnt
    }
    this.size++
}

func (this *FreqStack) Pop() int {
    // If stack empty, return -1
    if this.size == 0 {
        return -1
    }
    l := this.group[this.maxFreq]
    // get result
    res := l[len(l)-1]
    // remove target
    this.freqs[res]--
    this.size--
    this.group[this.maxFreq] = l[0:len(l)-1]
    // update counter
    if len(this.group[this.maxFreq]) == 0 {
        delete(this.group, this.maxFreq)
        this.maxFreq--
    }
    return res
}
