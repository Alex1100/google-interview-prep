package abstract_factory

import "testing"

func TestMotorbikeFactory(t *testing.T) {
  motorbikeF, err := GetVehicleFactory(MotorbikeFactoryType)
  if err != nil {
    t.Fatal(err)
  }

  motorbikeVehicle, err := motorbikeF.GetVehicle(SportsMotorbikeType)
  if err != nil {
    t.Fatal(err)
  }

  t.Logf("Motorbike has %d wheels and %d seats\n", motorbikeVehicle.GetWheels(), motorbikeVehicle.GetSeats())

  sportBike, ok := motorbikeVehicle.(Motorbike)

  if !ok {
    t.Fatal("Struct assertion has failed")
  }

  t.Logf("Sport motorbike has type %d\n", sportBike.GetType())
}


func TestCarFactory(t *testing.T) {
  carF, err := GetVehicleFactory(3)
  if err == nil {
    t.Fatal("Car factory with id 3 should not be recognized")
  }

  carF, err = GetVehicleFactory(CarFactoryType)
  if err != nil {
    t.Fatal(err)
  }

  luxuryCar, err := carF.GetVehicle(LuxuryCarType)
  if err != nil {
    t.Fatal(err)
  }

  t.Logf("Luxury Car has %d wheels and %d seats\n", luxuryCar.GetWheels(), luxuryCar.GetSeats())

  sportsCar, ok := luxuryCar.(Car)

  if !ok {
    t.Fatal("Struct assertion has failed")
  }

  t.Logf("Sports Luxury Car has %d doors\n", sportsCar.GetDoors())
}
