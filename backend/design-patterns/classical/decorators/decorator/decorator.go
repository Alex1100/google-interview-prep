package decorator

import (
  "errors"
  "fmt"
)

/*
 * Decorator Pattern
 *
 * Allows decorating an existing type with more
 * functional features
 *
 * Uses an approach to russian nested dolls
 *
 * Decorator type implements the same
 * interface of the type it decorates
 *
 * We could stack as many decorators as needed
 *
 * Great for extending legacy code
 *
 * Useful in creating types with lots of
 * features based on user inputs,
 * preferences, pr similar inputs
 *
 * Typically used when:
 *
 * We need to add functionality to some code
 * that we don't have access to
 *
 * When we want the functionality of an object
 * to be created or altered dynamically
 *
 * Decorator vs Proxy
 *
 * Decorator is used at runtime
 * Proxy is used at compile time
 *
 * Decorators are generally more flexible
 * Proxies are less flexible
 *
 * Decorators allow adding functionality at runtime
 * Proxies do not
 *
 *
 * Decorators are preferable for web servers
 * Proxies are preferable for stand alone apps/libraries/snippets
 *
 *
 */


type IngredientAdd interface {
  AddIngredient() (string, error)
}

type PizzaDecorator struct {
  Ingredient IngredientAdd
}

func (p *PizzaDecorator) AddIngredient() (string, error) {
  return "Pizza with the following ingredients:", nil
}

type Meat struct {
  Ingredient IngredientAdd
}

func (m *Meat) AddIngredient() (string, error) {
  if m.Ingredient == nil {
    return "", errors.New("An IngredientAdd is needed in the Ingredient field of the Meat")
  }

  s, err := m.Ingredient.AddIngredient()
  if err != nil {
    return "", err
  }

  return fmt.Sprintf("%s %s,", s, "meat"), nil
}

type Onion struct {
  Ingredient IngredientAdd
}

func (o *Onion) AddIngredient() (string, error) {
  if o.Ingredient == nil {
    return "", errors.New("An IngredientAdd is needed in the Ingredient field of the Onion")
  }

  s, err := o.Ingredient.AddIngredient()
  if err != nil {
    return "", err
  }

  return fmt.Sprintf("%s %s,", s, "onion"), nil
}
