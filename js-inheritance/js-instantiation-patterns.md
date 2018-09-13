<a href="https://medium.com/dailyjs/instantiation-patterns-in-javascript-8fdcf69e8f9b">Thanks Jennifer Bland</a>

**Table of Contents**

- [Functional](#functional)
- [Functional Shared](#functional-shared)
- [Prototypal](#prototypal)
- [Psuedoclassical](#psuedoclassical)
- [Classical](#classical)

# Functional

With functional instantiation, we first create a function. Inside the function we create an empty object and add properties and methods to it. We then return this object.

Every time the function is called we will have access to the methods that were created. Here is an example of functional instantiation:

```js
    const Animal = (species, name) => {
        let obj = {};
        obj.species = species;
        obj.name = name;

        obj.makeSound = () => {
            return 'enter animal sound here';
        }

        obj.eat = () => {
            return 'food eaten';
        }

        obj.sleep = () => {
            return 'slept';
        }

        return obj;
    }

    // implementation of functional instantiation
    let cat = Animal('cat', 'whiskers');
    cat.eat();
    cat.makeSound();
```

Pros:
For most people that are learning JavaScript this is the method that they learned for creating a new object. For anybody reading your code, it is easy to understand because all the functions are contained within the object. The properties are private since they are contained within the closure scope.

Cons:
Since all the methods are contained within the function, if you create a second instance of that object, you will have duplicated all the properties and methods in memory. If you create a new object using this method, then change any of the methods and create a new instance, the two objects will be referencing different methods.


# Functional-Shared

One of the downsides of functional instantiation is that you duplicate methods in memory every time you create a new object. Functional shared instantiation attempts to overcome that limitation by making the methods shared among all objects.

Just like functional instantiation, we start with a function with an empty object inside and define properties within the function. Methods are defined in another object. We then extend our object with these methods. In the end, we return the object. Every object created by functional shared instantiation will have a pointer to the same methods without duplication. Here is an example of functional shared instantiation.

```js
    const Animal = (species, name) => {
        let obj = {};
        obj.species = species;
        obj.name = name;
        extend(obj, objMethods);
        return obj;
    }

    const extend = (obj, methods) => {
        for (let key in methods) {
            obj[key] = methods[key];
        }
    }

    const objMethods = {
        makeSound: () => {
            return 'enter animal sound here';
        },
        eat: () => {
            return 'food eaten';
        },
        sleep: () => {
            return 'slept';
        }
    }


    // implementation of functional shared instantiation
    let cat = Animal('cat', 'whiskers');
    cat.eat();
    cat.makeSound();
```


Pros:
Removes the duplication of methods that was found in functional instantiation which improves memory management.

Cons:
The pointers to the shared methods are created when the object is instantiated. If you modify the methods and then create new objects, they original object and the new object will refer to different methods.


# Prototypal Instantiation

Prototypal instantiation utilizes the prototype chain to create objects. Methods are attached to the object’s prototype using the Object.create method.

To start you will create all the methods on a separate object. Then you create a function. Inside the function you use the Object.create method to attach the methods. You will also define any properties inside the function. Then you return the object. Here is an example of prototypal instantiation.


```js
    const Animal = (species, name) => {
        let obj = Object.create(objMethods);
        obj.species = species;
        obj.name = name;
        return obj;
    }

    const objMethods = {
        makeSound: () => {
            return 'enter animal sound here';
        },
        eat: () => {
            return 'food eaten';
        },
        sleep: () => {
            return 'slept';
        }
    }


    // implementation of prototypal instantiation
    let cat = Animal('cat', 'whiskers');
    cat.eat();
    cat.makeSound();
```


Pros:
Methods are attached to the object’s prototype instead of being returned within the object. Every method is available to every object created without duplicating methods in memory.

Cons:
To use this method, you have to create an object, decorate it and then return it from the constructor function.



# Psuedoclassical

Pseudoclassical instantiation attempts to overcome the amount of typing required to create an object using prototypal instantiation. Like prototypal, Pseudoclassical instantiation uses the prototype chain.

JavaScript provides most of the functionality that create with prototypal instantiation with the use of the keyword new. Pseudoclassical instantiation utilizes this when creating a new object.

Instead of creating a new variable and assigning Object.create() to it, Pseudoclassical instantiation assigns it to “this”.
To start you create a new function and create properties using the “this” keyword. Methods are assigned to the prototype. To create a new object, you use the keyword “new”. Here is an example of Pseudoclassical instantiation.


```js
    const Animal = (species, name) => {
        this.species = species;
        this.name = name;
    }
    Animal.prototype.makeSound = () => {
        return 'enter animal sound here';
    };

    Animal.prototype.eat = () => {
        return 'food eaten';
    };

    Animal.prototype.sleep = () => {
        return 'slept';
    }

    // implementation of pseudoclassical instantiation
    const cat = new Animal('cat', 'whiskers');
    cat.eat();
    cat.makeSound();
```

Pros:
By utilizing functionality built into JavaScript, Pseudoclassical instantiation is the most optimized method of object creation.

Cons:
It is a little more complex in its design when compared to the other three methods.


# Classical

JavaScript classes, introduced in ECMAScript 2015 (ES6), are primarily syntactical sugar over JavaScript’s existing prototype-based inheritance. The class syntax does not introduce a new object-oriented inheritance model to JavaScript.

You instantiate it using `new Animal` instead of `Object.create(animal)` — this is the shorter and more idiomatic way.


```js
    class Animal {
        constructor(species, name) {
            this.species = species;
            this.name = name;
        }

        makeSound = () {
            return 'enter animal sound here';
        }

        eat = () => {
            return 'food eaten';
        }

        sleep = () {
            return 'slept';
        }
    }

    // implementation of Classical instantiation
    let cat = new Animal('cat', 'whiskers');
    cat.eat();
    cat.makeSound();
```


