package main

func climbStairs(n int) int {
    if n <= 0 {
        return 0
    }

    return fibonacci(n)
}

func fibonacci(num int) int {
    a := 1
    b := 0
    temp := 0;

  for num >= 0 {
    temp = a;
    a = a + b;
    b = temp;
    num--;
  }

  return b;
}


func main() {
  var stairs []int
  stairs = []int{1, 2, 3, 4, 5, 6}
  climbStairs(stairs)
}
