package singleton

/*
 * Provides a single instance of an object
 * Guarantees that there are no duplicates
 * Easy to remember
 *
 * Generally want to use Singleton's whenever:
 *
 * We need a single, shared value, of some
 * particular type
 *
 * We need to restrict object creation of some type
 * to a single unit along the entire program
 *
 * Example Use cases:
 * 1. When you want to use the same connection
 *    to a database to make every query.
 * 2. When you open an SSH connection to a server
 *    to do a few tasks.
 * 3. If you need to limit the access to some
 *    variable or space
 * 4. If you need to limit the number of calls
 *    to some places
 */


type Singleton interface {
  AddOne() int
}

type sing struct {
  count int
}

var instance *sing

func GetInstance() Singleton {
  if instance == nil {
    instance = new(sing)
  }
  return instance
}

func (s *sing) AddOne() int {
  s.count++
  return s.count
}
