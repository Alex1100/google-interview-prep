package builder

/*
 * Provides a way to construct complex objects
 * without directly instantiating their struct
 *
 * Generally want to use Builder's whenever:
 *
 * Avoid writing the logic to create all the
 * the objects in the package
 *
 * Help us maintain an unpredictable number
 * of instances of a given object, interface, etc...
 *
 * Reduces technical debt in the source code
 * so new engineers could create objects, interfaces,
 * etc... much more rapidly
 *
 * Example Use cases:
 * 1. Abstract complex creations
 * 2. Creates an object step by step by filling
 *    its fields and creating embedded objects
 * 3. Reuse the object creation algorithm
 *    between many objects
 */

type BuildProcess interface {
  SetWheels() BuildProcess
  SetSeats() BuildProcess
  SetStructure() BuildProcess
  GetVehicle() VehicleProduct
}

//Director
type ManufacturingDirector struct {
  builder BuildProcess
}

func (f *ManufacturingDirector) Construct() {
  f.builder.SetSeats().SetStructure().SetWheels()
}

func (f *ManufacturingDirector) SetBuilder(b BuildProcess) {
  f.builder = b
}

//Product
type VehicleProduct struct {
  Wheels int
  Seats int
  Structure string
}

type CarBuilder struct {
  v VehicleProduct
}

func (c *CarBuilder) SetWheels() BuildProcess {
  c.v.Wheels = 4
  return c
}

func (c *CarBuilder) SetSeats() BuildProcess {
  c.v.Seats = 5
  return c
}


func (c *CarBuilder) SetStructure() BuildProcess {
  c.v.Structure = "Car"
  return c
}

func (c CarBuilder) GetVehicle() VehicleProduct {
  return c.v
}

type BikeBuilder struct {
  v VehicleProduct
}

func (b *BikeBuilder) SetWheels() BuildProcess {
  b.v.Wheels = 2
  return b
}

func (b *BikeBuilder) SetSeats() BuildProcess {
  b.v.Seats = 1
  return b
}


func (b *BikeBuilder) SetStructure() BuildProcess {
  b.v.Structure = "Bike"
  return b
}

func (b *BikeBuilder) GetVehicle() VehicleProduct {
  return b.v
}

type BusBuilder struct {
  v VehicleProduct
}

func (bb *BusBuilder) SetWheels() BuildProcess {
  bb.v.Wheels = 4
  return bb
}

func (bb *BusBuilder) SetSeats() BuildProcess {
  bb.v.Seats = 50
  return bb
}


func (bb *BusBuilder) SetStructure() BuildProcess {
  bb.v.Structure = "Bus"
  return bb
}

func (bb *BusBuilder) GetVehicle() VehicleProduct {
  return bb.v
}
