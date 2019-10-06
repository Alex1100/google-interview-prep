package chain_of_responsibility

import (
  "fmt"
  "strings"
  "testing"
)

type MyTestWriter struct {
  receivedMessage *string
}

func (m *MyTestWriter) Write(p []byte) (int, error) {
  if m.receivedMessage == nil {
    m.receivedMessage = new(string)
  }
  tempMessage := fmt.Sprintf("%s%s", *m.receivedMessage, p)
  m.receivedMessage = &tempMessage
  return len(p), nil
}

func (m *MyTestWriter) Next(s string) {
  m.Write([]byte(s))
}


func TestCreateDefaultChain(t *testing.T) {
  myWriter := MyTestWriter{}

  writerLogger := WriterLogger{Writer: &myWriter}
  second := SecondLogger{NextChain: &writerLogger}
  chain := FirstLogger{NextChain: &second}

  t.Run("3 loggers, 2 of them write to the console, second only if it found the word 'hello', third writes to some variable if second found 'hello'", func(t *testing.T) {
    chain.Next("message that breaks the chain")

    if myWriter.receivedMessage != nil {
      t.Error("Last link should not receive any message")
    }

    chain.Next("Hello")

    if myWriter.receivedMessage == nil || !strings.Contains(*myWriter.receivedMessage, "Hello") {
      t.Fatal("Last link didn't receive expected message")
    }
  })

  t.Run("2 loggers, second uses the closure implementation", func(t *testing.T) {
    myWriter = MyTestWriter{}
    closureLogger := ClosureChain{
      Closure: func(s string) {
        fmt.Printf("My closure logger! Message: %s\n", s)
        myWriter.receivedMessage = &s
      },
    }

    writerLogger.NextChain = &closureLogger

    chain.Next("Hello closure logger")

    if *myWriter.receivedMessage != "Hello closure logger" {
      t.Fatal("Expected message wasn't received in myWriter")
    }
  })
}
