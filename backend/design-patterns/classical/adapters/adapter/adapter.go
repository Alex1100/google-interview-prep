package adapter

import "fmt"

/*
 * Adapter Pattern
 *
 * Useful when an interface gets outdated
 * and it's not possible to replace it easily
 *
 * Helps to maintain the open/closed principle
 *
 * Allows us to write code which uses some
 * base that we can't modify
 *
 * Helps fit the needs of two parts of the code
 * that are incopmpatible at first
 *
 * Two interfaces which are incopmpatible
 * but must be used together are good
 * candidates for an Adapter Pattern
 *
 * Useful for maintaing backwords compatability
 * while still being able to add new featuresain.
 *
 */

type LegacyPrinter interface {
  Print(s string) string
}

type MyLegacyPrinter struct{}

func (l *MyLegacyPrinter) Print(s string) (newMsg string) {
  newMsg = fmt.Sprintf("Legacy Printer: %s\n", s)
  fmt.Println(newMsg)
  return newMsg
}

type NewPrinter interface {
  PrintStored() string
}

type PrinterAdapter struct {
  OldPrinter LegacyPrinter
  Msg string
}

func (p *PrinterAdapter) PrintStored() (newMsg string) {
  if p.OldPrinter == nil {
    newMsg = p.Msg
    return newMsg
  }

  return p.OldPrinter.Print(fmt.Sprintf("Adapter: %s", p.Msg))
}
