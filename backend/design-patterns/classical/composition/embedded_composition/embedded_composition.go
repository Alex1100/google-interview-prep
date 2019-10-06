package embedded_composition

import (
  "fmt"
)

type Athlete struct{}

func (a *Athlete) Train() {
  fmt.Println("Training")
}

func Swim() {
  fmt.Println("Swimming")
}

type SwimmerImplementor struct {}

func (s *SwimmerImplementor) Swim() {
  fmt.Println("Swimming")
}


type Trainer interface {
  Train()
}

type Swimmer interface {
  Swim()
}

type CompositeSwimmerB struct {
  Trainer
  Swimmer
}

type Animal struct{}
func (r *Animal) Eat() {
  fmt.Println("Eating")
}


type Shark struct {
  Animal
  Swim func()
}
