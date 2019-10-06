package direct_composition

import "testing"

func TestAthlete_Train(t *testing.T) {
  athlete := Athlete{}
  athlete.Train()
}

func TestSwimmer_Swim(t *testing.T) {
  swimmer := CompositeSwimmerA {
    MySwim: Swim,
  }
  swimmer.MyAthlete.Train()
  (swimmer.MySwim)()
}
