type ParkingSystem struct {
	Big int
	Medium int
	Small int
	BigCount int
	MediumCount int
	SmallCount int
}


func Constructor(big int, medium int, small int) ParkingSystem {
	ps := &ParkingSystem{
			Big: big,
			Medium: medium,
			Small: small,
			BigCount: 0,
			MediumCount: 0,
			SmallCount: 0,
	}
	
	return *ps
}


func (this *ParkingSystem) AddCar(carType int) bool {
	if carType == 1 {
			if this.BigCount < this.Big {
					this.BigCount++
					return true
			} else {
					return false
			}
	} else if carType == 2 {
			if this.MediumCount < this.Medium {
					this.MediumCount++
					return true
			} else {
					return false
			}
	} else if carType == 3 {
			if this.SmallCount < this.Small {
					this.SmallCount++
					return true
			} else {
					return false
			} 
	}
	
	return true
}


/**
* Your ParkingSystem object will be instantiated and called as such:
* obj := Constructor(big, medium, small);
* param_1 := obj.AddCar(carType);
*/