type FreqStack struct {
	Frequencies map[int]int
	MaxFreq int
	Group map[int][]int
}

// Design a stack-like data structure to push elements to the stack and pop the most frequent element from the stack.

// Implement the FreqStack class:

// FreqStack() constructs an empty frequency stack.
// void push(int val) pushes an integer val onto the top of the stack.
// int pop() removes and returns the most frequent element in the stack.
// If there is a tie for the most frequent element, the element closest to the stack's top is removed and returned.


// Constraints:

// 0 <= val <= 109
// At most 2 * 104 calls will be made to push and pop.
// It is guaranteed that there will be at least one element in the stack before calling pop.

// Input
// ["FreqStack", "push", "push", "push", "push", "push", "push", "pop", "pop", "pop", "pop"]
// [[], [5], [7], [5], [7], [4], [5], [], [], [], []]
// Output
// [null, null, null, null, null, null, null, 5, 7, 5, 4]

// https://leetcode.com/problems/maximum-frequency-stack/description/

func Constructor() FreqStack {
	fs := &FreqStack{
			Frequencies: map[int]int{},
			MaxFreq: 0,
			Group: map[int][]int{},
	}
	
	return *fs
}


func (this *FreqStack) Push(x int)  {
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
	this.Group[this.MaxFreq] = maxGroup[0:len(maxGroup)-1]
	// update counter
	if len(this.Group[this.MaxFreq]) == 0 {
			delete(this.Group, this.MaxFreq)
			this.MaxFreq--
	}
	return res
}