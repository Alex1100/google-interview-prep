func maximumUnits(boxTypes [][]int, truckSize int) int {
	capacity := truckSize
	maxUnits := 0
	sort.Slice(boxTypes, func(i, j int) bool {
			if boxTypes[i][1] < boxTypes[j][1] {
					return false
			} else {
					return true
			}
	})

	for _, boxSet := range boxTypes {
			numBoxes, numUnits := boxSet[0], boxSet[1]
			ableToLoad := int(math.Min(float64(capacity), float64(numBoxes)))
			if ableToLoad <= 0 {
					break
			}
			maxUnits += numUnits * ableToLoad
			capacity -= ableToLoad
	}
			
	return maxUnits
}