package factory

import (
  "fmt"
  "errors"
)

/*
 * Delegates the creation of different type of objects
 *
 * The second best known and used design pattern
 * in the industry
 *
 * Abstracts the user from the knowledge of
 * the struct they need to create an object
 *
 * Provides an interface that fits the users needs
 *
 * Eases the process of downgrading or
 * upgrading of the implementation
 *
 * Working at the interface level instead
 * of with concrete implementations
 *
 * Provides a way to construct complex objects
 * without directly instantiating their struct
 */

type PaymentMethod interface {
  Pay(amount float32) string
}

type CashPM struct{}
type DebitCardPM struct{}
type NewDebitCardPM struct{}
type CreditCardPM struct {}

const (
  Cash         = 1
  DebitCard    = 2
  NewDebitCard = 3
  CreditCard   = 4
)


func GetPaymentMethod(m int) (PaymentMethod, error) {
  switch m {
    case Cash:
      return new(CashPM), nil
    case DebitCard:
      return new(DebitCardPM), nil
    case NewDebitCard:
      return new(NewDebitCardPM), nil
    case CreditCard:
      return new(CreditCardPM), nil
    default:
      return nil, errors.New("Not implemented yet")
  }
}

func (c *CashPM) Pay(amount float32) string {
  return fmt.Sprintf("%#0.2f payed using cash\n", amount)
}

func (c *DebitCardPM) Pay(amount float32) string {
  return fmt.Sprintf("%#0.2f payed using debit card\n", amount)
}

func (c *NewDebitCardPM) Pay(amount float32) string {
  return fmt.Sprintf("%#0.2f payed using debit card (new)\n", amount)
}

func (c *CreditCardPM) Pay(amount float32) string {
  return fmt.Sprintf("%#0.2f payed using credit card implementation\n", amount)
}
