package bridge

import (
  "errors"
  "fmt"
  "io"
)

/*
 * Bridge Pattern
 *
 * It decouples an abstraction from its
 * implementation so that the two can vary
 * independently
 *
 * It also allows for decoupling the most
 * basic form of functionality aka
 * decouple an object from what it does
 *
 * Allows chaning the abstracted object
 * while reusing the same implementation
 *
 * Objectives of a Bridge Pattern are:
 *
 * Bring flexibility to a struct that
 * changes often
 *
 * Define the inputs and outputs of
 * a particular method
 *
 * Allow changing the code without
 * knowing too much about it
 *
 */

type PrinterAPI interface {
 PrintMessage(msg string) error
}
type PrinterImpl1 struct{}

func (p *PrinterImpl1) PrintMessage(msg string) error {
  fmt.Printf("%s\n", msg)
  return nil
}

type PrinterImpl2 struct {
 Writer io.Writer
}

func (d *PrinterImpl2) PrintMessage(msg string) error {
  if d.Writer == nil {
    return errors.New("You need to pass an io.Writer to PrinterImpl2")
  }
  fmt.Fprintf(d.Writer, "%s", msg)
  return nil
}


type PrinterAbstraction interface {
  Print() error
}

type NormalPrinter struct {
  Msg string
  Printer PrinterAPI
}

func (c *NormalPrinter) Print() error {
  c.Printer.PrintMessage(c.Msg)
  return nil
}


type PacktPrinter struct {
  Msg string
  Printer PrinterAPI
}

func (c *PacktPrinter) Print() error {
  c.Printer.PrintMessage(fmt.Sprintf("Message from Packt: %s", c.Msg))
  return nil
}
