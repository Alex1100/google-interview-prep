package abstract_factory

import (
  "errors"
  "fmt"
)

type Vehicle interface {
  GetWheels() int
  GetSeats() int
}

type Car interface {
  GetDoors() int
}

type Motorbike interface {
  GetType() int
}

type VehicleFactory interface {
  GetVehicle(c int) (Vehicle, error)
}

type CarFactory struct{}
type MotorbikeFactory struct{}
type LuxuryCar struct{}
type FamilyCar struct{}
type CruiseMotorbike struct{}
type SportsMotorbike struct{}

const (
  LuxuryCarType        = 1
  SportsMotorbikeType  = 1
  FamilyCarType        = 2
  CruiseMotorbikeType  = 2
  CarFactoryType       = 1
  MotorbikeFactoryType = 2
)

func (l *LuxuryCar) GetDoors() int {
  return 4
}

func (l *LuxuryCar) GetWheels() int {
  return 4
}

func (l *LuxuryCar) GetSeats() int {
  return 5
}

func (l *FamilyCar) GetDoors() int {
  return 5
}

func (l *FamilyCar) GetWheels() int {
  return 4
}

func (l *FamilyCar) GetSeats() int {
  return 5
}

func (s * SportsMotorbike) GetWheels() int {
  return 2
}

func (s *SportsMotorbike) GetSeats() int {
  return 1
}

func (s *SportsMotorbike) GetType() int {
  return SportsMotorbikeType
}

func (s * CruiseMotorbike) GetWheels() int {
  return 2
}

func (s *CruiseMotorbike) GetSeats() int {
  return 2
}

func (s *CruiseMotorbike) GetType() int {
  return CruiseMotorbikeType
}

func (m *MotorbikeFactory) GetVehicle(v int) (Vehicle, error) {
  switch v {
  case SportsMotorbikeType:
      return new(SportsMotorbike), nil
    case FamilyCarType:
      return new(CruiseMotorbike), nil
    default:
      return nil, errors.New(fmt.Sprintf("Vehicle of type %d not recognized\n", v))
  }
}

func (c *CarFactory) GetVehicle(v int) (Vehicle, error) {
  switch v {
    case LuxuryCarType:
      return new(LuxuryCar), nil
    case FamilyCarType:
      return new(FamilyCar), nil
    default:
      return nil, errors.New(fmt.Sprintf("Vehicle of type %d not recognized\n", v))
  }
}


func GetVehicleFactory(f int) (VehicleFactory, error) {
  switch f {
    case CarFactoryType:
      return new(CarFactory), nil
    case MotorbikeFactoryType:
      return new(MotorbikeFactory), nil
    default:
      return nil, errors.New(fmt.Sprintf("Factory with id %d not recognized\n", f))
  }
}
