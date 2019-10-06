package main

import (
  "fmt"
  factory "golang-practice/design-patterns/factories/factory"
)

func main() {
  payment, err := factory.GetPaymentMethod(factory.CreditCard)
  if err != nil {
    fmt.Println("OOPS: ", err)
  }
  msg := payment.Pay(22.30)
  fmt.Println(msg)
}
