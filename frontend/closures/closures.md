# Javascript Closures, IIFE

Today we are going to look at some interesting features of the
javascript language. Javascript is a prototype-based language with 1st
class functions derived from scheme (and self) languages with a C like
syntax.

What is a prototype-based language? It is a language of
object-oriented programming in which behaviour (think inheritance) is
performed by cloning existing objects (i.e. prototypes). It is also an
object creation design pattern that is describe in detail by the GoF
(https://en.wikipedia.org/wiki/Prototype_pattern).

First class functions are first class citizens of the programming
language. This is really apparent in JS because since the language
supports passing in functions as arguements to other functions and
also returning them from functions. The names of functions also do not
have special status and are treated as variables with a function type
instead. It is also a really important concept that without 1 class
functions, functional programming could not exist.

Anyways lets get onto closures!

## Closures

What is a closure? Simply put, a closure is an inner function that has
access to the outer (enclosing) funcitons variables called the scope
chain. Remember that javascript is **function scoped**. Each closure
has 3 scope chains: it own defined variables, the outer function's
variables and the global scope.

The closure has access to all of its enclosing functions
variables. This includes even the arguments of the outer
function. There is one catch...it does not have access to the outer
funtions *arguments* object however.

Here is an example of a closure:

```js
function showName(firstName, lastName) {
  var nameIntro = "Your name is ";
  function makeFullName() {
      return nameIntro + firstName + " " + lastName;
  }
  return makeFullName();
}
```

Closures are extremely important in JS. Without them Node.js
asynchronous non-blocking architecture could exist. There are also
used in about every pieve of javascript that you read. But they do
have some side-effects, some of which are beneficial.

### Closures' Rules and Side Effects

**1. Closures have access to the outer function's variables even after
the outer function returns**

One of the most important and ticklish features with closures is that
the inner function still has access to the outer function’s variables
even after the outer function has returned. Yep, you read that
correctly. When functions in JavaScript execute, they use the same
scope chain that was in effect when they were created. This means that
even after the outer function has returned, the inner function still
has access to the outer function’s variables. Therefore, you can call
the inner function later in your program. This example demonstrates:

```js
function celebrityName (firstName) {
    var nameIntro = "This celebrity is ";
    // this inner function has access to the outer function's variables, including the parameter​
   function lastName (theLastName) {
        return nameIntro + firstName + " " + theLastName;
    }
    return lastName;
}
​
​var mjName = celebrityName ("Michael"); // At this juncture, the celebrityName outer function has returned.​
​
​// The closure (lastName) is called here after the outer function has returned above​
​// Yet, the closure still has access to the outer function's variables and parameter​
mjName ("Jackson"); // This celebrity is Michael Jackson 
```

**2. Closures store references to the outer function’s variables**

They do not store the actual value.  Closures get more interesting
when the value of the outer function’s variable changes before the
closure is called. And this powerful feature can be harnessed in
creative ways, such as this private variables example first
demonstrated by Douglas Crockford: 

```javascript
function celebrityID () {
    var celebrityID = 999;
    // We are returning an object with some inner functions​
    // All the inner functions have access to the outer function's variables​
    return {
        getID: function ()  {
            // This inner function will return the UPDATED celebrityID variable​
            // It will return the current value of celebrityID, even after the changeTheID function changes it​
          return celebrityID;
        },
        setID: function (theNewID)  {
            // This inner function will change the outer function's variable anytime​
            celebrityID = theNewID;
        }
    }
​
}
​
​var mjID = celebrityID (); // At this juncture, the celebrityID outer function has returned.​
mjID.getID(); // 999​
mjID.setID(567); // Changes the outer function's variable​
mjID.getID(); // 567: It returns the updated celebrityId variable 
```

This is also how we could implement **OOP** and we will take about it
later in this lecture.

**3. Closures Gone Awry**

Because closures have access to the updated values of the outer
function’s variables, they can also lead to bugs when the outer
function’s variable changes with a for loop. Thus:

```javascript
// This example is explained in detail below (just after this code box).​
​function celebrityIDCreator (theCelebrities) {
    var i;
    var uniqueID = 100;
    for (i = 0; i < theCelebrities.length; i++) {
      theCelebrities[i]["id"] = function ()  {
        return uniqueID + i;
      }
    }

    return theCelebrities;
}
​
​var actionCelebs = [{name:"Stallone", id:0}, {name:"Cruise", id:0}, {name:"Willis", id:0}];
​
​var createIdForActionCelebs = celebrityIDCreator (actionCelebs);
​
​var stalloneID = createIdForActionCelebs [0];  console.log(stalloneID.id()); // 103
```

To fix this side effect (bug) in closures, you can use an Immediately
Invoked Function Expression (**IIFE**)
