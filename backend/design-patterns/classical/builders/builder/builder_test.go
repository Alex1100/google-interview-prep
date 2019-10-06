package builder

import "testing"

func TestBuilderPattern(t *testing.T) {
  manufacturingComplex := ManufacturingDirector{}

  carBuilder := &CarBuilder{}
  manufacturingComplex.SetBuilder(carBuilder)
  manufacturingComplex.Construct()


  car := carBuilder.GetVehicle()

  if car.Wheels != 4 {
    t.Errorf("Car must have 4 wheels, instead has %d", car.Wheels)
  }

  if car.Structure != "Car" {
    t.Errorf("Car must have structure of Car, instead has %s", car.Structure)
  }

  if car.Seats != 5 {
    t.Errorf("Car must have 5 seats, instead has %d", car.Seats)
  }

  bikeBuilder := &BikeBuilder{}
  manufacturingComplex.SetBuilder(bikeBuilder)
  manufacturingComplex.Construct()

  bike := bikeBuilder.GetVehicle()

  if bike.Wheels != 2 {
    t.Errorf("Bike must have 2 wheels, instead has %d", bike.Wheels)
  }

  if bike.Structure != "Bike" {
    t.Errorf("Bike must have structure of Bike, instead has %s", bike.Structure)
  }

  if bike.Seats != 1 {
    t.Errorf("Bike must have 1 seat, instead has %d", bike.Seats)
  }

  busBuilder := &BusBuilder{}
  manufacturingComplex.SetBuilder(busBuilder)
  manufacturingComplex.Construct()

  bus := busBuilder.GetVehicle()

  if bus.Wheels != 4 {
    t.Errorf("Bus must have 4 wheels, instead has %d", bus.Wheels)
  }

  if bus.Structure != "Bus" {
    t.Errorf("Bus must have structure of Bus, instead has %s", bus.Structure)
  }

  if bus.Seats != 50 {
    t.Errorf("Bus must have 50 seats, instead has %d", bus.Seats)
  }
}
