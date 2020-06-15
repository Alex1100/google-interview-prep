package main

type MovingAverage struct {
    Nums []int
    Divisor int
}


/** Initialize your data structure here. */
func Constructor(size int) MovingAverage {
    res := &MovingAverage{
        Nums: make([]int, 0),
        Divisor: size,
    }
    return *res
}


func (this *MovingAverage) Next(val int) float64 {
    this.Nums = append(this.Nums, val)
    sum := 0
    divisor := this.Divisor
    if len(this.Nums) > this.Divisor {
        for i := len(this.Nums) - 1; i >= len(this.Nums) - this.Divisor; i-- {
            sum += this.Nums[i]
        }
    } else {
        for i := 0; i < len(this.Nums); i++ {
            sum += this.Nums[i]
        }

        divisor = len(this.Nums)
    }

    return float64(sum) / float64(divisor)
}


/**
 * Your MovingAverage object will be instantiated and called as such:
 * obj := Constructor(size);
 * param_1 := obj.Next(val);
 */

 func main() {
   c := Constructor(2)
   fmt.Println(c.Next(1))
   fmt.Println(c.Next(2))
 }
