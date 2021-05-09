package main

type FreqStack struct {
	Frequencies map[int]int
	MaxFreq     int
	Group       map[int][]int
}

func Constructor() FreqStack {
	fs := &FreqStack{
		Frequencies: map[int]int{},
		MaxFreq:     0,
		Group:       map[int][]int{},
	}

	return *fs
}

func (this *FreqStack) Push(x int) {
	this.Frequencies[x]++
	count := this.Frequencies[x]
	this.Group[count] = append(this.Group[count], x)
	if this.MaxFreq < count {
		this.MaxFreq = count
	}
}

func (this *FreqStack) Pop() int {
	// If stack empty, return -1
	if len(this.Group[this.MaxFreq]) == 0 {
		return -1
	}

	maxGroup := this.Group[this.MaxFreq]
	// get result
	res := maxGroup[len(maxGroup)-1]
	// remove target
	this.Frequencies[res]--
	this.Group[this.MaxFreq] = maxGroup[0 : len(maxGroup)-1]
	// update counter
	if len(this.Group[this.MaxFreq]) == 0 {
		delete(this.Group, this.MaxFreq)
		this.MaxFreq--
	}
	return res
}

/**
 * Your FreqStack object will be instantiated and called as such:
 * obj := Constructor();
 * obj.Push(x);
 * param_2 := obj.Pop();
 */
