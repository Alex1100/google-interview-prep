package main

import (
  "fmt"
  singleton "golang-practice/design-patterns/singletons/singleton"
)

func main() {
  var counter1 singleton.Singleton
  counter1 = singleton.GetInstance()
  fmt.Println(counter1)
  counter1.AddOne()
  fmt.Println(counter1)
  var counter2 singleton.Singleton
  counter2 = singleton.GetInstance()
  fmt.Println(counter2)
}
