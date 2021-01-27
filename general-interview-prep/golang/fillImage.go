func fillImage(grid [][]int, x, y, target, updated int) {
	isSame := grid[x][y] == target
	notUpdated := grid[x][y] != updated
	if isSame {
			grid[x][y] = updated
			 
			//left
			if y - 1 >= 0 && notUpdated {
					fillImage(grid, x, y - 1, target, updated);
			}

			//top
			if x - 1 >= 0 && notUpdated {
					fillImage(grid, x - 1, y, target, updated);
			}

			//right
			if y + 1 < len(grid[x]) && notUpdated {
					fillImage(grid, x, y + 1, target, updated);
			}

			//bottom
			if x + 1 < len(grid) && notUpdated {
					fillImage(grid, x + 1, y, target, updated);
			}
	}
}

func floodFill(image [][]int, sr int, sc int, newColor int) [][]int {
	start := image[sr][sc]
	fillImage(image, sr, sc, start, newColor)
	return image
}