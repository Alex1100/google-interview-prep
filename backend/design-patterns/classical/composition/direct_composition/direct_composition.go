package direct_composition

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

type CompositeSwimmerA struct {
  MyAthlete Athlete
  MySwim func()
}

type Trainer interface {
  Train()
}

type Swimmer interface {
  Swim()
}

type SwimmerImplementor struct{}

func (s *SwimmerImplementor) Swim() {
  fmt.Println("Swimming")
}

type CompositeSwimmerB struct {
  Trainer
  Swimmer
}
