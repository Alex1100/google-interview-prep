package main

import (
  "fmt"
  builder "golang-practice/design-patterns/builders/builder"
)

func main() {
  manufacturingComplex := &builder.ManufacturingDirector{}

  carBuilder := &builder.CarBuilder{}
  manufacturingComplex.SetBuilder(carBuilder)
  manufacturingComplex.Construct()


  car := carBuilder.GetVehicle()
  fmt.Printf("%d\n%s\n%d\n", car.Wheels, car.Structure, car.Seats)
}
