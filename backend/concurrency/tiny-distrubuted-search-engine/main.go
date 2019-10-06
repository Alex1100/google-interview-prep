package main

import (
  "fmt"
  "os"
  "time"
  "strings"
)


type User struct {
  Email string
  Name string
}

var DataBase = []User{
  {Email: "alexander.davis@example.com", Name: "Alexander Davis"},
  {Email: "alexander.jackson@example.com", Name: "Alexander Jackson"},
  {Email: "daniel.miller@example.com", Name: "Daniel Miller"},
  {Email: "james.miller@example.com", Name: "James Miller"},
  {Email: "mason.martinez@example.com", Name: "Mason Martinez"},
  {Email: "sofia.garcia@example.com", Name: "Sofia Garcia"},
  {Email: "natalie.henderson@example.com", Name: "Natalie Henderson"},
  {Email: "doug.smith@example.com", Name: "Doug Smith"},
  {Email: "phil.norris@example.com", Name: "Phil Norris"},
}

type Worker struct {
  users []User
  ch chan *User
  name string
}


func NewWorker(users []User, ch chan *User, name string) *Worker {
  return &Worker{
    users: users,
    ch: ch,
    name: name,
  }
}

func (w *Worker) Find(email string,) {
  for i := range w.users {
    user := &w.users[i]
    if strings.Contains(strings.ToLower(user.Email), strings.ToLower(email)) {
      fmt.Printf(">> %s\n", w.name)
      w.ch <- user
    }
  }
}


func main() {
  email := os.Args[1]

  ch := make(chan *User)
  // pass first half of db to one worker
  // and the other half to another worker
  // this is how db sharding is done
  // we create a separate worker to
  // be responsible for reading, writing
  // to the db proportionately

  firstPartition := DataBase[:3]
  secondPartition := DataBase[3:6]
  thirdPartition := DataBase[6:]
  firstWorker := NewWorker(firstPartition, ch, "worker-1")
  secondWorker := NewWorker(secondPartition, ch, "worker-2")
  thirdWorker := NewWorker(thirdPartition, ch, "worker-3")

  fmt.Println("Looking for email: ", email)

  go firstWorker.Find(email)
  go secondWorker.Find(email)
  go thirdWorker.Find(email)

  for {
    select {
      case user := <- ch:
        fmt.Printf("The email %s is owned by %s\n", email, user.Name)
      case <- time.After(100 * time.Millisecond):
        return
    }
  }
}
