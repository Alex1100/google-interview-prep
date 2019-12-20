import "container/heap"

type MedianFinder struct {
	size    int
	minHeap MinHeap
	maxHeap MaxHeap
}

/** initialize your data structure here. */
func Constructor() MedianFinder {
	return MedianFinder{
		size:    0,
		minHeap: MinHeap{},
		maxHeap: MaxHeap{},
	}
}

func (this *MedianFinder) AddNum(num int) {
	if this.size == 0 {
		heap.Push(&this.maxHeap, num)
		heap.Push(&this.minHeap, num)
	} else if this.size%2 == 0 {
		if this.minHeap[0] <= num {
			heap.Push(&this.maxHeap, this.minHeap[0])
			heap.Push(&this.minHeap, num)
		} else if this.maxHeap[0] >= num {
			heap.Push(&this.minHeap, this.maxHeap[0])
			heap.Push(&this.maxHeap, num)
		} else {
			heap.Push(&this.maxHeap, num)
			heap.Push(&this.minHeap, num)
		}
	} else {
		if this.minHeap[0] <= num {
			heap.Pop(&this.minHeap)
			heap.Push(&this.minHeap, num)
		} else {
			heap.Pop(&this.maxHeap)
			heap.Push(&this.maxHeap, num)
		}
	}

	this.size++
}

func (this *MedianFinder) FindMedian() float64 {
	return float64(this.minHeap[0]+this.maxHeap[0]) / 2.0
}

type MinHeap []int

func (h MinHeap) Len() int                { return len(h) }
func (h MinHeap) Less(i, j int) bool      { return h[i] < h[j] }
func (h MinHeap) Swap(i, j int)           { h[i], h[j] = h[j], h[i] }
func (h *MinHeap) Push(value interface{}) { *h = append(*h, value.(int)) }
func (h *MinHeap) Pop() interface{} {
	min := (*h)[len(*h)-1]
	*h = (*h)[:len(*h)-1]
	return min
}

type MaxHeap []int

func (h MaxHeap) Len() int                { return len(h) }
func (h MaxHeap) Less(i, j int) bool      { return h[i] > h[j] }
func (h MaxHeap) Swap(i, j int)           { h[i], h[j] = h[j], h[i] }
func (h *MaxHeap) Push(value interface{}) { *h = append(*h, value.(int)) }
func (h *MaxHeap) Pop() interface{} {
	min := (*h)[len(*h)-1]
	*h = (*h)[:len(*h)-1]
	return min
}
