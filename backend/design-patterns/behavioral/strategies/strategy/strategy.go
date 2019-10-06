package strategy

import (
  "fmt"
  "image"
  "image/color"
  "image/draw"
  "image/jpeg"
  "os"
)

/*
 * Strategy Pattern
 *
 * Uses different algorithms to achieve specific
 * functionality
 *
 * Algorithms hidden behind an interface
 *
 * All algorithms achieve same functionality
 * in different ways
 *
 * Example:
 * A sort interface and few sorting algorithms
 *
 *
 * Provides few alogorithms to achieve specific
 * functionality
 *
 * All types achieve the same functionality
 *
 */


type PrintStrategy interface {
  Print() error
}

type ConsoleSquare struct{}
type ImageSquare struct {
  DestinationFilePath string
}

func (c *ConsoleSquare) Print() error {
  fmt.Println("Square")
  return nil
}

func (z *ImageSquare) Print() error {
  width := 800
  height := 600

  bgColor := image.Uniform{color.RGBA{R: 60, G: 60, B: 60, A: 0}}

  origin := image.Point{0, 0}
  quality := &jpeg.Options{Quality: 75}

  bgImage := image.NewRGBA(image.Rectangle{
    Min: origin,
    Max: image.Point{X: width, Y: height},
  })

  draw.Draw(bgImage, bgImage.Bounds(), &bgColor, origin, draw.Src)

  squareWidth := 200
  squareHeight := 200
  squareColor := image.Uniform{color.RGBA{R: 255, G: 0, B: 0, A: 1}}
  square := image.Rect(0, 0, squareWidth, squareHeight)
  square = square.Add(image.Point{
    X: (width / 2) - (squareWidth / 2),
    Y: (height / 2) - (squareHeight / 2),
  })

  squareImg := image.NewRGBA(square)

  draw.Draw(bgImage, squareImg.Bounds(), &squareColor, origin, draw.Src)
  fmt.Println(z.DestinationFilePath)
  w, err := os.Create(z.DestinationFilePath)
  if err != nil {
    return fmt.Errorf("Error opening image")
  }

  defer w.Close()

  if err = jpeg.Encode(w, bgImage, quality); err != nil {
    return fmt.Errorf("Error writing image to disk")
  }

  return nil
}
