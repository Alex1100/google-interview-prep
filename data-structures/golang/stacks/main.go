package main

import (
	"fmt"
	"stack"
)

func main() {
	oo := InitStack()
	oo.Insert(99)
	fmt.Println(oo.Pop())
}
