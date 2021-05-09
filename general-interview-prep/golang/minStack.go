type MinStack struct {
	MinIndex int
	Items []int
}


/** initialize your data structure here. */
func Constructor() MinStack {
	ms := &MinStack{
			MinIndex: -1,
			Items: make([]int, 0),
	}
	
	return *ms
}


func (this *MinStack) Push(x int)  {
	if len(this.Items) == 0 {
			this.Items = append(this.Items, x)
			this.MinIndex = 0
	} else {
			this.Items = append(this.Items, x)
			if x < this.Items[this.MinIndex] {
					this.MinIndex = len(this.Items) - 1
			}
	}
}


func (this *MinStack) Pop()  {
	this.Items = this.Items[:len(this.Items) - 1]
	min := math.MaxInt64
	this.MinIndex = 0
	for i := 0; i < len(this.Items); i++ {
			if this.Items[i] < min {
					this.MinIndex = i
					min = this.Items[i]
			}
	}
}


func (this *MinStack) Top() int {
	return this.Items[len(this.Items) - 1]
}


func (this *MinStack) GetMin() int {
	return this.Items[this.MinIndex]
}


/**
* Your MinStack object will be instantiated and called as such:
* obj := Constructor();
* obj.Push(x);
* obj.Pop();
* param_3 := obj.Top();
* param_4 := obj.GetMin();
*/