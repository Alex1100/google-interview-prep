package chain_of_responsibility

import (
  "fmt"
  "io"
  "strings"
)

/*
 * Chain of Responsibility Pattern
 *
 * Consists of a Chain
 *
 * Abstraction must have one single responsibility
 *
 * You can apply many functions
 *
 * You can chain them to execute in order
 *
 * Dynamically chain the actions at runtime
 * Pass a request through a chain of processors
 *
 * Chain of responsibility patterns are used to:
 *
 * Create Finite State Machines (FSM)
 *
 * Also used interchangeable with the decorator pattern
 *
 *
 *
 *
 */


type ChainLogger interface {
  Next(string)
}

type FirstLogger struct {
  NextChain ChainLogger
}

func (f *FirstLogger) Next(s string) {
  fmt.Printf("First logger: %s\n", s)

  if f.NextChain != nil {
    f.NextChain.Next(s)
  }
}

type SecondLogger struct {
  NextChain ChainLogger
}

func (sec *SecondLogger) Next(s string) {
  if strings.Contains(strings.ToLower(s), "hello") {
    fmt.Printf("Second logger: %s\n", s)

    if sec.NextChain != nil {
      sec.NextChain.Next(s)
    }

    return
  }

  fmt.Printf("Finishing up second logger\n\n")
}

type WriterLogger struct {
  NextChain ChainLogger
  Writer io.Writer
}

func (wri *WriterLogger) Next(s string) {
  if wri.Writer != nil {
    wri.Writer.Write([]byte("WriterLogger: " + s))
  }

  if wri.NextChain != nil {
    wri.NextChain.Next(s)
  }
}

type ClosureChain struct {
  NextChain ChainLogger
  Closure func(string)
}

func (c *ClosureChain) Next(s string) {
  if c.Closure != nil {
    c.Closure(s)
  }

  if c.NextChain != nil {
    c.Next(s)
  }
}
