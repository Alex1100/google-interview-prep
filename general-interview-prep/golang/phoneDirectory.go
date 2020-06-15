package main
//
// Design a Phone Directory which supports the following operations:
//
//
// 
// get: Provide a number which is not assigned to anyone.
// check: Check if a number is available or not.
// release: Recycle or release a number.
//
//
// Example:
//
// // Init a phone directory containing a total of 3 numbers: 0, 1, and 2.
// PhoneDirectory directory = new PhoneDirectory(3);
//
// // It can return any available phone number. Here we assume it returns 0.
// directory.get();
//
// // Assume it returns 1.
// directory.get();
//
// // The number 2 is available, so return true.
// directory.check(2);
//
// // It returns 2, the only number that is left.
// directory.get();
//
// // The number 2 is no longer available, so return false.
// directory.check(2);
//
// // Release number 2 back to the pool.
// directory.release(2);
//
// // Number 2 is available again, return true.
// directory.check(2);
//
//
// Constraints:
//
// 1 <= maxNumbers <= 10^4
// 0 <= number < maxNumbers
// The total number of call of the methods is between [0 - 20000]
//

type PhoneDirectory struct {
    Taken map[string]bool
    Numbers []int
    Last int
}


/** Initialize your data structure here
        @param maxNumbers - The maximum numbers that can be stored in the phone directory. */
func Constructor(maxNumbers int) PhoneDirectory {
    nums := make([]int, maxNumbers)
    for i := 0; i < maxNumbers; i++ {
        nums[i] = -1
    }
    res := &PhoneDirectory{
        Taken: map[string]bool{},
        Numbers: nums,
        Last: -1,
    }

    return *res
}


/** Provide a number which is not assigned to anyone.
        @return - Return an available number. Return -1 if none is available. */
func (this *PhoneDirectory) Get() int {
    if this.Last < 0 {
        this.Last = 0
        this.Numbers[this.Last] = 0
        this.Taken[string(this.Last)] = true
        this.Last++
        return 0
    } else if this.Taken[string(this.Last)] == false {
        this.Taken[string(this.Last)] = true
        this.Numbers[this.Last] = this.Last
        this.Last++
        return this.Numbers[this.Last - 1]
    } else if this.Last == len(this.Numbers) {
        return -1
    }
    return -1
}


/** Check if a number is available or not. */
func (this *PhoneDirectory) Check(number int) bool {
    return this.Taken[string(number)] == true
}


/** Recycle or release a number. */
func (this *PhoneDirectory) Release(number int)  {
    this.Taken[string(number)] = false
    this.Numbers[number - 1] = -1
}


/**
 * Your PhoneDirectory object will be instantiated and called as such:
 * obj := Constructor(maxNumbers);
 * param_1 := obj.Get();
 * param_2 := obj.Check(number);
 * obj.Release(number);
 */
