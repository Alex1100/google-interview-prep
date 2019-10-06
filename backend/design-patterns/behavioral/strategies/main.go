package main

import (
  "flag"
  "log"
  "golang-practice/design-patterns/behavioral/strategies/strategy"
)

var output = flag.String("output", "console", "The output to use between 'console' and 'image' file")


func main() {
  // original
  flag.Parse()
  var activeStrategy strategy.PrintStrategy
  switch *output {
  case "image":
    activeStrategy = &strategy.ImageSquare{DestinationFilePath: "/tmp/image.jpg"}
  default:
    activeStrategy = &strategy.ConsoleSquare{}
  }

  err := activeStrategy.Print()
  if err != nil {
    log.Fatal(err)
  }
}
