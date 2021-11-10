# Scopes and closures

## Chapter 1: whats is the scope ?

workng with variables is the mos foundational things we ado in programming, but how does js to know which variables
are accesible by any statement and how dows handle two variables of the same name ?

to answer to question is the the welldefined rules called `scope`

Js is tipically classified as an interpreted script language, but JS is in fact parsed/compiled in separate phases `before the execution begins`

js functions are themselves first class values, they can be:

- asigned
- pased around just like numbers or strings

These functions maintain their original scope no matter where in the program functions are executed

and this is called **`closure`**

### compiled vsc interpreted

compilations is a sdet of steps that process the text and tur it into a list of instructions can understand

interpretation is a similar task to compilation. The source code is trasformed line by line, and eac line or statemens is executed

#### compilation

The compilation process stages:

- tokenizing/lexing, breaking string of characters in chunks called tokens
- parsing, takinng a stream of tokens and turning it into a tree of nested elements (AST)
- code generation, taking an AST and turning into a executale code

#### Required: two phases

JS proigrams is that ocurres in at least two phases: parsing/compilation then execution

#### syntax error from starts

```javascript
var greeting = "Hello";

console.log(greeting);

greeting = ."Hi";
// SyntaxError: unexpected token .

```

this program produces no output, but instead throws a `SyntaxError`, parsing the entire program before it is execute

#### Early Errors

```javascript
console.log('Howdy');

saySomething('Hello', 'Hi');
// Uncaught SyntaxError: Duplicate parameter name not
// allowed in this context

function saySomething(greeting, greeting) {
  'use strict';
  console.log(greeting);
}
```

#### hoisting

```javascript
function saySomething() {
  var greeting = 'Hello';
  {
    greeting = 'Howdy'; // error comes from here
    let greeting = 'Hi';
    console.log(greeting);
  }
}
```

JS engine handle a programs vvariables it must firs label each ocurrence of a variable as `target` or `source`

```javascript
var students = [
  { id: 14, name: 'Kyle' },
  { id: 73, name: 'Suzy' },
  { id: 112, name: 'Frank' },
  { id: 6, name: 'Sarah' },
];

function getStudentName(studentID) {
  for (let student of students) {
    if (student.id == studentID) {
      return student.name;
    }
  }
}

var nextStudent = getStudentName(73);
console.log(nextStudent);
// Suzy
```

before found some targets `var = students...`, ` getStudentName(73)`, `for (let student of students)`

#### sources

the rest of variables that is not targets are sources

### cheating \_ runtime scope modifications

using a two ways to modifying the program scope. but these techniques are dangerous and confusing

`eval(...)` receives a string of code to compile and execute on the fly during the progrma runtime

```javascript
function badIdea() {
  eval("var oops = 'Ugh!';");
  console.log(oops);
}
badIdea(); // Ugh!
```

the with keyword, which essentially dynamically turns an object into a local scope—its properties are treated as identifiers in that new scope’s block:

```javascript
var badIdea = { oops: 'Ugh!' };
with (badIdea) {
  console.log(oops); // Ugh!
}
```

### Chapter 2: Illustrating Lexical Scope

The term “lexical” refers to the first stage of compilation.

0To properly reason about our programs, it’s important to have a solid conceptual foundation of how scope works

Variables are declared in specific scopes

```javascript
// outer/global scope: RED
var students = [
  { id: 14, name: 'Kyle' },
  { id: 73, name: 'Suzy' },
  { id: 112, name: 'Frank' },
  { id: 6, name: 'Sarah' },
];
function getStudentName(studentID) {
  // function scope: BLUE
  for (let student of students) {
    // loop scope: GREEN
    if (student.id == studentID) {
      return student.name;
    }
  }
}
```

#### A Conversation Among Friends
Another useful metaphor for the process of analyzing vari- ables and the scopes they come from is to imagine various conversations that occur inside the engine as code is processed and then executed

#### Nested Scope

JS engine is looking for the identifier reference, if it is not found in the current scope , the next outer scope in the nesting is consulted. That process is repeated until an answer is found or there not more scopes to consult

#### lookup failures

if js engine still cannot reolve the loopup for an identifier, an error condition then exist, bu depending on the mode of the program (strict mode or not) and the role of the variable

#### Undefined Mess

- if the variable is a `source`, an unresolved identifier lookup is considered an undeclared(unknown, missing) variable which always result in a `ReferenceError`
- If the variable is a `target`, and the code at that moment is running in strict mode, the variable is considered undeclared and similarly, throws a `ReferenceError`

To perpetuate the confusion even further, JS’s typeof opera- tor returns the string "undefined" for variable references in either state:

```javascript
var studentName;
typeof studentName; // "undefined"
typeof doesntExist; // "undefined"
```

These two variable references are in very different conditions

#### Global... What!?

If the variable is a target and strict-mode is not in effect, the global scope’s Scope Manager will just create an accidental global variable to fulfill that target assignment.

```javascript
function getStudentName() {
  // assignment to an undeclared variable :(
  nextStudent = 'Suzy';
}
getStudentName();
console.log(nextStudent);
// "Suzy" -- oops, an accidental-global variable!
```

#### Building On Metaphors

the nested scope resolution is like looking something in a building, first lookup on the current floor, and if dont find it, take the elevator to next floor, you either find what you re looking for or you dont

## Chapter 3: The Scope Chain

The connections between scopes that are nested within other scopes is called the scope chain, which determines the path along which variables can be accessed.

Any reference to a variable that’s initially undeclared is left as an out of any scope, a grey area.

#### Shadowing

two or more variables, each in different scopes, with the same lexical names.

So if you need to maintain two or more variables of the same name, you must use separate (often nested) scopes

```javascript
var studentName = 'Suzy';
function printStudent(studentName) {
  studentName = studentName.toUpperCase();
  console.log(studentName);
}
printStudent('Frank');
// FRANK
printStudent(studentName);
// SUZY
console.log(studentName);
// Suzy
```

#### Global Unshadowing Trick

It is possible to access a global variable from a scope where that variable has been shadowed, but not through a typical lexical identifier reference

```javascript
var studentName = 'Suzy';
function printStudent(studentName) {
  console.log(studentName);
  console.log(window.studentName);
}
printStudent('Frank');
// "Frank"
// "Suzy"
```

This expression is accessing the global variable studentName as a property on window (which we’re pretending for now is synonymous with the global object).

#### Copying Is Not Accessing

```jsx
var special = 42;
function lookingFor(special) {
  var another = {
    special: special,
  };
  function keepLooking() {
    var special = 3.141592;
    console.log(special);
    console.log(another.special); // Ooo, tricky! console.log(window.special);
  }
  keepLooking();
}
lookingFor(112358132134);
// 3.141592
// 112358132134
// 42
```

`special: special` is copying the value of the special parameter variable into another container, if you put a value in another container, shadowing no longer applies

#### Illegal Shadowing

Not all combinations of declaration shadowing are allowed. let can shadow var, but var cannot shadow let:

```javascript
function something() {
  var special = 'JavaScript';
  {
    let special = 42; // totally fine shadowing
    // ..
  }
}

function another() {
  // ..
  {
    let special = 'JavaScript';
    {
      var special = 'JavaScript'; // ^^^ Syntax Error
      // ..
    }
  }
}
```

That boundary-crossing prohibition effectively stops at each function boundary, so this variant raises no exception:

```javascript
function another() {
  // ..
  {
    let special = 'JavaScript';
    ajax('https://some.url', function callback() {
      // totally fine shadowing
      var special = 'JavaScript';
      // ..
    });
  }
}
```

let (in an inner scope) can always shadow an outer scope’s var. var (in an inner scope) can only shadow an outer scope’s let if there is a function boundary in between.

#### Function Name Scope

As you’ve seen by now, a function declaration looks like this:

```javascript
// function declaration
function askQuestion() {
  // ..
}
```

it create an identifier scope name `askQuestion`

```javascript
// function expression
var askQuestion = function () {
  // ..
};
```

The same is true for the variable `askQuestion` being created. But since it’s a **function expression**—a **function definition** used as value instead of a standalone declaration—the function itself will not “hoist”

For formal function declarations, the name identifier ends up in the outer/en- closing scope, so it may be reasonable to assume that’s true here. But ofTheTeacher is declared as an identifier inside the function itself:

```javascript
var askQuestion = function ofTheTeacher() {
  console.log(ofTheTeacher);
};
askQuestion();
// function ofTheTeacher()...
console.log(ofTheTeacher);
// ReferenceError: ofTheTeacher is not defined
```

A function expression with a name identifier is referred to as a “named function expression,”

one without a name identifier is referred to as an “anonymous function expres- sion.”

Anonymous function expressions clearly have no name identifier that affects either scope.

#### Arrow Functions

ES6 added an additional function expression form to the language, called “arrow functions”:

```javascript
var askQuestion = () => {
  // ..
};
```

The => arrow function doesn’t require the word function to define it.

- the `( .. )` around the parameter list is optional
- the `{ .. }` around the function body is optional
- when the `{ .. }` are omitted, a return value is sent out without using a `return` keyword.
- with or without `{ .. }` around its body, still creates a separate, inner nested bucket of scope

The assignment to askQuestion creates an inferred name of “askQuestion”, but that’s not the same thing as being non- anonymous:

```javascript
var askQuestion = () => {
  // ..
};
askQuestion.name; // askQuestion
```

#### Backing Out

When a function (declaration or expression) is defined, a new scope is created.

The scope chain controls variable access, directionally oriented upward and outward

## Chapter 4: Around the Global Scope

The global scope of a JS program is a rich topic, with much more utility and nuance than you would likely assume.

Fully understanding the global scope is critical in your mas- tery of using lexical scope to structure your programs.

#### Why Global Scope?

So how exactly do all those separate files get stitched together in a single runtime context by the JS engine?

there are three main ways.

- directly using ES modules
- using a bundler in your build process
- simply loaded in the browser individually (via `<script>` tags or other dynamic JS resource loading),

```javascript
(function wrappingOuterScope() {
  var moduleOne = (function one() {
    // ..
  })();
  var moduleTwo = (function two() {
    // ..
    function callModuleOne() {
      moduleOne.someMethod();
    }

    // ..
  })();
})();
```

the moduleOne and moduleTwo local variables inside the wrappingOuterScope(), While the scope of wrappingOuterScope() is a function and not the full environment global scope, it does act as a sort of “application-wide scope”

where an applica- tion’s code resides during runtime, and how each piece is able to access the other pieces to cooperate, the global scope is also where:

JS exposes its built-ins:

- primitives:undefined,null,Infinity,NaN – natives:Date(),Object(),String(),etc.
- global functions: eval(), parseInt(), etc. – namespaces:Math,Atomics,JSON
- friends of JS: Intl, WebAssembly

The environment hosting the JS engine exposes its own built-ins:

- console (and its methods)
- the DOM (window, document, etc)
- timers (setTimeout(..), etc)
- web platform APIs: navigator, history, geolocation, WebRTC, etc.

Most developers agree that the global scope shouldn’t just be a dumping ground for every variable in your application. That’s

### Where Exactly is this Global Scope?

It might seem obvious that the global scope is located in the outermost portion of a file; that is, not inside any function or other block. But it’s not quite as simple as that.

#### Browser “Window”

With respect to treatment of the global scope, the most pure environment JS can be run in is as a standalone .js file loaded in a web page environment in a browser.

#### Globals Shadowing Globals

where one variable declaration can override and prevent access to a declaration of the same name from an outer scope.

```javascript
window.something = 42;

let something = 'Kyle';

console.log(something);
// Kyle

console.log(window.something);
// 42
```

The let declaration adds a something global variable but not a global object property.

A simple way to avoid this gotcha with global declarations: always use var for globals. Reserve let and const for block scopes.

#### DOM Globals

One surprising behavior in the global scope you may encounter with browser-based JS applications: a DOM element with an id attribute automatically creates a global variable that references it.

```html
<ul id="my-todo-list">
  <li id="first">Write a book</li>
  ..
</ul>
```

```javascript
first;
// <li id="first">..</li>
window['my-todo-list'];
// <ul id="my-todo-list">..</ul>
```

If the id value is a valid lexical name (like first), the lexical variable is created. If not, the only way to access that global is through the global object (window[..]).

**never to use these global variables**

#### What’s in a (Window) Name?

Another global scope oddity in browser-based JS:

```javascript
var name = 42;

console.log(name, typeof name);
// "42" string
```

`Window.name` is a pre-defined “global” in a browser context; it’s a property on the global object

We used var for our declaration, which does not shadow the pre-defined name global property.

#### Web Workers

Web Workers are a web platform extension on top of browser- JS behavior, which allows a JS file to run in a completely separate thread

Since these Web Worker programs run on a separate thread, they’re restricted in their communications with the main application thread, to avoid/limit race conditions and other complications

Some web APIs are, however, made available to the worker, such as navigator.

`Web Worker scope !== global scope`

In a Web Worker, the global object reference is typically made using self:

```javascript
var studentName = 'Kyle';
let studentID = 42;

function hello() {
  console.log(`Hello, ${self.studentName}!`);
}

self.hello();
// Hello, Kyle!

self.studentID;
// undefined
```

#### Developer Tools Console/REPL

_Developer Tools don’t create a completely adherent JS environment._

These tool environments prioritize developer convenience

#### ES Modules (ESM)

ES6 introduced first-class support for the module pattern

```javascript
var studentName = "Kyle";
function hello() {
  console.log(`Hello, ${ studentName }!`);
}

hello();

// Hello, Kyle!
export hello;
```

it will still run exactly the same. But the observable effects will be different.

Despite being declared at the top level of the (module) file, in the outermost obvious scope, studentName and hello are not **global variables**.

Instead, they are module-wide, or if you prefer, _“module-global.”_

This is not to say that global variables cannot exist or be accessed in such programs.

It’s just that global variables don’t get created by declaring variables in the top-level scope of a module.

The module’s top-level scope is descended from the global scope

ESM encourages a minimization of reliance on the global scope, where you import whatever modules you may need for the current module to operate

#### Node

One aspect of Node that often catches JS developers off-guard is that Node treats every single .js file that it loads, including the main one you start the Node process with, as a module

The practical effect is that the top level of your Node programs **is never actually the global scope**

Before processing, Node effectively wraps such code in a function, so that the var and function declarations.

As noted earlier, Node defines a number of “globals” like require()

They’re injected in the scope of every module

So how do you define actual global variables in Node? The only way to do so is to add properties to another of Node’s automatically provided “globals”

```javascript
global.studentName = 'Kyle';

function hello() {
  console.log(`Hello, ${studentName}!`);
}

hello();
// Hello, Kyle!

module.exports.hello = hello;
```

#### Global This

Yet another “trick” for obtaining a reference to the global scope object looks like:

```javascript
const theGlobalScopeObject = new Function('return this')();
```

As of ES2020, JS has finally defined a standardized reference to the global scope object, called globalThis.

#### Globally Aware

The global scope is present and relevant in every JS program, even though modern patterns for organizing code into mod- ules de-emphasizes much of the reliance on storing identifiers in that namespace.

## Chapter 5: The (Not So) Secret Lifecycle of Variables

### When Can I Use a Variable?

At what point does a variable become available to use within its scope? There may seem to be an obvious answer: after the variable has been declared/created. Right? Not quite.

Consider:

```javascript
greeting();
// Hello!
function greeting() {
  console.log('Hello!');
}
```

points out that all identifiers are registered to their respective scopes during compile time

The identifier is created at the beginning of the scope it belongs to, every time that scope is entered.

The term most commonly used for a variable being visible from the beginning of its enclosing scope, even though its declaration may appear further down in the scope, is called hoisting.

The answer is a special characteris- tic of formal function declarations, called function hoisting.

That’s why the function can be called throughout the entire scope!

One key detail is that both function hoisting and var-flavored variable hoisting attach their name identifiers to the nearest enclosing function scope (or, if none, the global scope), not a block scope.

## Hoisting: Declaration vs. Expression

Function hoisting only applies to formal function declarations, not to function expression assignments. Consider:

```javascript
greeting();
// TypeError
var greeting = function greeting() {
  console.log('Hello!');
};
```

A TypeError means we’re trying to do something with a value that is not allowed.

Notice that the error is not a ReferenceError. JS isn’t telling us that it couldn’t find greeting as an identifier in the scope.

Only functions can be invoked, so attempting to invoke some non-function value results in an error. don’t happen until that assignment is processed during runtime execution

In addition to being hoisted, variables declared with var are also automatically initialized to undefined at the beginning of their scope

A function decla- ration is hoisted **and initialized to its function value** (again, called function hoisting)

A var variable is also hoisted, and then auto-initialized to undefined.

### Variable Hoisting

Let’s look at another example of variable hoisting:

```javascript
greeting = 'Hello!';
console.log(greeting);
// Hello!
var greeting = 'Howdy!';
```

There’s two necessary parts to the explanation:

- the identifier is hoisted,
- and it’s automatically initialized to the value `undefined` from the top of the scope.

### Hoisting: Yet Another Metaphor

Rather than hoisting being a concrete execution step the JS engine performs, it’s more useful to think of hoisting as a visualization of various actions JS takes in setting up the program before execution.

The explanation often asserted is that the JS engine will actually rewrite that program before execution, so that it looks more like this:

```javascript
var greeting; // hoisted declaration
greeting = 'Hello!'; // the original line 1
console.log(greeting); // Hello!
greeting = 'Howdy!'; // `var` is gone!
```

Moreover, the hoisting metaphor asserts that function declarations are, in their entirety, hoisted to the top of each scope

```javascript
studentName = 'Suzy';
greeting();
// Hello Suzy!
function greeting() {
  console.log(`Hello ${studentName}!`);
}
var studentName;
```

The “rule” of the hoisting metaphor is that function declara- tions are hoisted first, then variables are hoisted immediately after all the functions. Thus, the hoisting story suggests that
program is re-arranged by the JS engine to look like this:

```javascript
function greeting() {
  console.log(`Hello ${studentName}!`);
}
var studentName;
studentName = 'Suzy';
greeting();
// Hello Suzy!
```

### Re-declaration?

What do you think happens when a variable is declared more than once in the same scope? Consider:

```javascript
var studentName = 'Frank';
console.log(studentName); // Frank
var studentName;
console.log(studentName); // ???
```

If you consider this program from the perspective of the hoisting metaphor, the code would be re-arranged like this for execution purposes:

```javascript
vvar studentName;
var studentName; // clearly a pointless no-op!
studentName = "Frank";
console.log(studentName);
// Frank
console.log(studentName);
// Frank
```

It’s also important to point out that var studentName; doesn’t mean var studentName = undefined;, as most assume. Let’s prove they’re different by considering this variation of the program:

```javascript
var studentName = 'Frank';
console.log(studentName); // Frank
var studentName;
console.log(studentName); // Frank <--- still!
// let's add the initialization explicitly
var studentName = undefined;
console.log(studentName); // undefined <--- see!?
```

A repeated var declaration of the same identifier name in a scope is effectively a do-nothing operation

What about repeating a declaration within a scope using let or const?

```javascript
let studentName = 'Frank';

console.log(studentName);

let studentName = 'Suzy';
```

This is a case where attempted “re-declaration” is explicitly not allowed!

If either declaration uses let, the other can be either let or var, and the error will still occur

It’s really more of a “social engineering” issue.
as a bad habit that can lead to program bugs. So when ES6 introduced let, they decided to prevent “re- declaration” with an error.

### Constants?

The const keyword is more constrained than let.

Like let, const cannot be repeated with the same identifier in the same scope.

The const keyword requires a variable to be initialized, so omitting an assignment from the declaration results in a SyntaxError:

```javascript
const empty; // SyntaxError
```

### Loops

```javascript
var keepGoing = true;
while (keepGoing) {
  let value = Math.random();
  if (value > 0.5) {
    keepGoing = false;
  }
}
```

Is value being “re-declared” repeatedly in this program? Will
we get errors thrown? No.

All the rules of scope (including “re-declaration” of let- created variables) are applied per scope instance, each time a scope is entered during execution, every- thing reset

var, let, and const keywords are effectively removed from the code by the time it starts to execute.

```javascript
for (let i = 0; i < 3; i++) {
  let value = i * 10;
  console.log(`${i}: ${value}`);
}
// 0: 0
// 1: 10
// 2: 20
```

It might seem like it would be in the outer (in this case, global) scope, but it’s not

const is being run exactly once within each loop iteration, so it’s safe from “re-declaration” troubles.

```javascript
for (const index in students) {
  // this is fine
}
for (const student of students) {
  // this is also fine
}
```

But not the general for-loop:

```javascript
for (const i = 0; i < 3; i++) {
  // oops, this is going to fail with
  // a Type Error after the first iteration
}
```

expanded model for loop:

```javascript
// a fictional variable for illustration
{
  const $$i = 0;
  for (; $$i < 3; $$i++) {
    // here's our actual loop `i`! const i = $$i;
    // ..
  }
}
```

The problem is the conceptual $$i that must be incremented each time with the $$i++ expression.

That’s re-assignment (not “re- declaration”), which isn’t allowed for constants.

### Uninitialized Variables (aka, TDZ)

With var declarations, the variable is “hoisted” to the top of its scope. But it’s also automatically initialized to the undefined value

However, let and const declarations are not quite the same in this respect.
Consider:

```javascript
console.log(studentName);
// ReferenceError
let studentName = 'Suzy';
```

The result of this program is that a ReferenceError is thrown on the first line.

The real question is, how do we initialize an uninitialized variable?

For let/const, the only way to do so is with an assignment attached to a declaration statement. An assign- ment by itself is insufficient!

```javascript
let studentName = 'Suzy';
console.log(studentName); // Suzy
```

We cannot use the variable at any point prior to that initialization occuring. The same goes for const as it
does for let.

The term coined by TC39 to refer to this period of time from the entering of a scope to where the auto-initialization of the variable occurs is: Temporal Dead Zone (TDZ).

The TDZ is the time window where a variable exists but is still uninitialized, and therefore cannot be accessed in any way.

A var also has technically has a TDZ, but it’s zero in length and thus unobservable to our programs!
**Only let and const have an observable TDZ.**

By the way, “temporal” in TDZ does indeed refer to time not position in code.

```javascript
askQuestion();
// ReferenceError
let studentName = 'Suzy';
function askQuestion() {
  console.log(`${studentName}, do you know?`);
}
```

There’s a common misconception that TDZ means let and const do not hoist. They definitely hoist.

let and const don’t auto-initialize at the top of the scope

let and const do hoist (auto-register at the top of the scope)

```javascript
var studentName = 'Kyle';
{
  console.log(studentName);
  // ???
  // ..
  let studentName = 'Suzy';
  console.log(studentName);
  // Suzy
}
```

the first console.log(..) throws a TDZ error, because in fact, the inner scope’s studentName was hoisted (auto-registered at the top of the scope)

TDZ errors occur because let/const dec- larations do hoist their declarations to the top of their scopes, but unlike var, they defer the auto-initialization of their variables until the moment in the code’s sequencing where the original declaration appeared

always put your let and const declarations at the top of any scope

### Finally Initialized

Hoisting, (re)declaration, and the TDZ are common sources of confusion for developers

Hoisting is generally cited as an explicit mechanism of the JS engine, but it’s really more a metaphor to describe the various ways JS handles variable declarations during compilation.

Declaration and re-declaration of variables tend to cause confusion when thought of as runtime operations

The TDZ (temporal dead zone) error is strange and frustrating when encountered

## Chapter 6: Limiting Scope Exposure

With that foundation now firmly in place, our attention raises to a higher level of thinking: decisions and patterns we apply across the whole program.

### Least Exposure

It makes sense that functions define their own scopes. But why do we need blocks to create scopes as well?

- Software engineering articulates a fundamental discipline, typically applied to software security, called “The Principle of Least Privilege” (POLP).

- And a variation of this principle that applies to our current discussion is typically labeled as “Least Exposure” (POLE).

POLP expresses a defensive posture to software architecture: components of the system should be designed to function with least privilege, least access, least exposure.

there are three main hazards that often arise:

- Naming Collisions: if you use a common and useful variable/function name in two different parts of the program, but the identifier comes from one shared scope

- Unexpected Behavior: if you expose variables/func- tions whose usage is otherwise private to a piece of the program

- Unintended Dependency: if you expose variables/func- tions unnecessarily, it invites other developers to use and depend on those otherwise private pieces.

POLE, as applied to variable/function scoping, essentially says, default to exposing the bare minimum necessary, keep- ing everything else as private as possible.

### Hiding in Plain (Function) Scope

let and const keywords, which are block scoped declarators

That can easily be done by wrapping a function scope around a declaration.

```javascript
var cache = {};
function factorial(x) {
  if (x < 2) return 1;
  if (!(x in cache)) {
    cache[x] = x * factorial(x - 1);
  }
  return cache[x];
}
factorial(6);
// 720
cache;
// {
// "2": 2,
// "3": 6,
// "4": 24,
// "5": 120,
// "6": 720
// }
factorial(7);
// 5040
```

We’re storing all the computed factorials in cache so that across multiple calls to factorial(..), the previous computations remain

```javascript
// outer/global scope
function hideTheCache() {
  // "middle scope", where we hide `cache` var cache = {};
  return factorial;
  // **********************
  function factorial(x) {
    // inner scope
    if (x < 2) return 1;
    if (!(x in cache)) {
      cache[x] = x * factorial(x - 1);
    }
    return cache[x];
  }
}
var factorial = hideTheCache();
factorial(6);
// 720
factorial(7);
// 5040
```

Before we have the task to give a name for every new function using `hideTheCache`

```javascript
var factorial = (function hideTheCache() {
  var cache = {};
  function factorial(x) {
    if (x < 2) return 1;
    if (!(x in cache)) {
      cache[x] = x * factorial(x - 1);
    }
    return cache[x];
  }
  return factorial;
})();
factorial(6);
// 720
factorial(7);
// 5040
```

### Invoking Function Expressions Immediately

the entire function expression in a set of ( .. ), and then on the end, we added that second () parentheses set; that’s actually calling the function expression we just defined

This common pattern has a name: Immediately Invoked Function Expression (IIFE).
defining a function expression that’s then immediately invoked.

An IIFE is useful when we want to create a scope to hide variables/functions.

here’s an example of a standalone IIFE:

```javascript
// outer scope
(function () {
  // inner hidden scope
})();
// more outer scope
```

### Function Boundaries

Because an IIFE is a full function, the function boundary alters the behavior of certain statements/constructs.

a return statement in some piece of code would change its meaning if an IIFE is wrapped around it because now the return would refer to the IIFE’s function.

Non-arrow function IIFEs also change the binding of a this keyword

So, if the code you need to wrap a scope around has return, this, break, or continue in it, an IIFE is probably not the best approach.

### Scoping with Blocks

In general, any `{ .. }` curly-brace pair which is a statement will act as a block, but not necessarily as a scope.

A block only becomes a scope if necessary, to contain its block-scoped declarations (i.e., let or const).

```javascript
{
  // not necessarily a scope (yet)
  // ..
  // now we know the block needs to be a scope
  let thisIsNowAScope = true;
  for (let i = 0; i < 5; i++) {
    // this is also a scope, activated each
    // iteration
    if (i % 2 == 0) {
      // this is just a block, not a scope
      console.log(i);
    }
  }
}
// 0 2 4
```

Not all `{ .. }` curly-brace pairs create blocks (and thus are eligible to become scopes):

- Object literals use `{ .. }` curly-brace pairs to delimit their key-value lists, but such object values are not scopes.
- class uses `{ .. }` curly-braces around its body defini- tion, but this is not a block or scope.
- A function uses `{ .. }` around its body, but this is not technically a block—it’s a single statement for the function body. It is, however, a (function) scope.
- The `{ .. }` curly-brace pair on a switch statement (around the set of case clauses) does not define a block/scope.

use (explicit) block scoping to narrow the exposure of identifiers to the minimum practical.

Another example with an explicit block scope:

```javascript
function getNextMonthStart(dateStr) {
  var nextMonth, year;
  {
    let curMonth;
    [, year, curMonth] = dateStr.match(/(\d{4})-(\d{2})-\d{2}/) || [];
    nextMonth = (Number(curMonth) % 12) + 1;
  }
  if (nextMonth == 1) {
    year++;
  }
  return `${year}-${String(nextMonth).padStart(2, '0')}-01`;
}
getNextMonthStart('2019-12-25');
// 2020-01-01
```

1. The outer/global scope has one identifier, the function getNextMonthStart(..).
2. The function scope for getNextMonthStart(..) has three: dateStr (parameter), nextMonth, and year.
3. The { .. } curly-brace pair defines an inner block scope that includes one variable: curMonth.

the benefits of the POLE prin- ciple are best achieved when you adopt the mindset of minimizing scope exposure by default, as a habit.

### var and let

That variable is used across the entire function.

`var` has always, from the earliest days of JS, signaled “variable that belongs to a whole function.”

var attaches to the nearest enclosing function scope, no matter where it appears.

```javascript
function diff(x, y) {
  if (x > y) {
    var tmp = x;
    x = y;
    y = tmp;
  }
  return y - x;
}
```

Even though var is inside a block, its declaration is function- scoped (to diff(..)), not block-scoped

### Where To let?

My advice to reserve var for (mostly) only a top-level func- tion scope means that most other declarations should use let.

If a declaration belongs in a block scope, use let. If it belongs in the function scope, use var (again, just my opinion).

**the semantic signal still has benefit for the reader of your code**

### What’s the Catch?

So far we’ve asserted that var and parameters are func- tion-scoped, and let/const signal block-scoped declarations.

There’s one little exception to call out: the catch clause.

the catch clause has used an additional (little-known) block- scoping declaration capability:

```javascript
try {
  doesntExist();
} catch (err) {
  console.log(err);
  // ReferenceError: 'doesntExist' is not defined
  // ^^^^ message printed from the caught exception
  let onlyHere = true;
  var outerVariable = true;
}
console.log(outerVariable); // true
console.log(err);
// ReferenceError: 'err' is not defined
// ^^^^ this is another thrown (uncaught) exception
```

The err variable declared by the catch clause is block-scoped to that block.

### Function Declarations in Blocks (FiB)

So what about function declarations that appear directly inside blocks? As a feature, this is called “FiB.”

```javascript
if (false) {
  function ask() {
    console.log('Does this run?');
  }
}
ask();
```

FiB is not worth it, and should be avoided.

### Blocked Over

The point of lexical scoping rules in a programming language is so we can `appropriately organize our program’s variables`, both for operational as well **as semantic code communication purposes.**

## Chapter 7: Using Closures

effectively use it(scope) in the structure of our programs; closure is central to that effort.

the least exposure principle (POLE) encourages us to use block (and function) scoping to limit the scope exposure of variables.

Functions remember these referenced scoped variables via closure.

If you’ve ever written a callback that accesses variables outside its own scope... guess what!? That’s closure.

### See the Closure

Closure is originally a mathematical concept, from lambda calculus

Closure is a behavior of functions and only functions. If you aren’t dealing with a function, closure does not apply.

For closure to be observed, a function must be invoked, and specifically it must be invoked in a different branch of the scope chain from where it was originally defined.

```javascript
// outer/global scope: RED(1)
function lookupStudent(studentID) {
  // function scope: BLUE(2)
  var students = [
    { id: 14, name: 'Kyle' },
    { id: 73, name: 'Suzy' },
    { id: 112, name: 'Frank' },
    { id: 6, name: 'Sarah' },
  ];
  return function greetStudent(greeting) {
    // function scope: GREEN(3)
    var student = students.find((student) => student.id == studentID);
    return `${greeting}, ${student.name}!`;
  };
}
var chosenStudents = [lookupStudent(6), lookupStudent(112)];
// accessing the function's name:
chosenStudents[0].name;
// greetStudent
chosenStudents[0]('Hello');
// Hello, Sarah!
chosenStudents[1]('Howdy');
// Howdy, Frank!
```

- makes reference to both students and studentID
- which come from the enclosing scope of lookupStudent(..)
- Each of those references from the inner function to the variable in an outer scope is called a `closure`

### Pointed Closure

The `student => student.id == studentID` arrow function is creating another scope bubble inside the greetStudent(..) function scope.

### Adding Up Closures

### Live Link, Not a Snapshot

Closure is actually a live link, preserving access to the full variable itself. We’re not limited to merely reading a value; the closed-over variable can be updated (re-assigned) as well!

as long as that function refer- ence exists in the program,we can keep using that variable (read and write)

Because it’s so common to mistake closure as value-ori- ented instead of variable-oriented

```javascript
var studentName = 'Frank';
var greeting = function hello() {
  // we are closing over `studentName`, // not "Frank"
  console.log(`Hello, ${studentName}!`);
};

// later
studentName = 'Suzy';
// later
greeting();
// Hello, Suzy!
```

### Common Closures: Ajax and Events

Closure is most commonly encountered with callbacks:

```javascript
function lookupStudentRecord(studentID) {
  ajax(`https://some.api/student/${studentID}`, function onRecord(record) {
    console.log(`${record.name} (${studentID})`);
  });
}
lookupStudentRecord(114);
// Frank (114)
```

- The onRecord(..) callback is going to be invoked
- from the internals of the ajax(..) utility
- the lookupStudentRecord(..) call will long since have complete

Event handlers are another common usage of closure:

```javascript
function listenForClicks(btn, label) {
  btn.addEventListener('click', function onClick() {
    console.log(`The ${label} button was clicked!`);
  });
}

var submitBtn = document.getElementById('submit-btn');

listenForClicks(submitBtn, 'Checkout');
```

### What If I Can’t See It?

If a closure exists (in a technical, implementation, or academic sense) but it cannot be observed in our programs, does it matter? No.

### Observable Definition

Closure is observed when a function uses vari- able(s) from outer scope(s) even while running in a scope where those variable(s) wouldn’t be accessible

The key parts of this definition are:

- Must be a function involved
- Must reference at least one variable from an outer scope
- Must be invoked in a different branch of the scope chain from the variable(s)

### The Closure Lifecycle and Garbage Collection (GC)

If ten functions all close over the same variable, and only nine references are discarded, the function still preserves that variable, until last final function references is discarded, the variable is gone

### Per Variable or Per Scope?

Conceptually, closure is per variable rather than per scope. Ajax callbacks, event handlers, and all other forms of function closures are typically assumed to close over only what they explicitly reference.

Many modern JS engines do apply an optimization that re- moves any variables from a closure scope that aren’t explicitly referenced.

### An Alternative Perspective

Closure is the link-association that connects that function to the scope/variables outside of itself, no matter where that function goes.

Closure instead describes the magic of keeping alive a function instance, along with its whole scope environment and chain.

### Why Closure?

### Closer to Closure

two models for mentally tackling closure:

- Observational: closure is a function instance remember- ing its outer variables even as that function is passed to and invoked in other scopes.
- Implementational: closure is a function instance and its scope environment preserved in-place while any refer- ences to it are passed around and invoked from other scopes.

benefits:

- Closure can improve code readability, bounding scope- exposure by encapsulating variable(s) inside function instances
- Closure can improve efficiency by allowing a function instance to remember previously determined informa- tion instead of having to compute it each time.

## Chapter 8: The Module Pattern

one of the most important code organization patterns in all of programming: the module.

### Encapsulation and Least Exposure (POLE)

The goal of encapsulation is the bundling or co-location of information (data) and behavior (functions) that together serve a common purpose.

Another key goal is the control of visibility of certain as- pects of the encapsulated data and functionality.

It’s easier to build and maintain software when we know where things are, with clear and obvious boundaries and connection points.

It’s also easier to maintain quality if we avoid the pitfalls of over-exposed data and functionality.

### What Is a Module?

A module is a collection of related data and functions (often referred to as methods in this context), characterized by a division between hidden private details and public accessible details, usually called the “public API.”

A module is also stateful: it maintains some information over time, along with functionality to access and update that information.

### Namespaces (Stateless Grouping)

set of related functions together, without data, then you don’t really have the expected encapsulation a module implies.

The better term for this grouping of stateless functions is a namespace:

```javascript
// namespace, not module
var Utils = {
  cancelEvt(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    evt.stopImmediatePropagation();
  },
  wait(ms) {
    return new Promise(function c(res) {
      setTimeout(res, ms);
    });
  },
  isValidEmail(email) {
    return /[^@]+@[^@.]+\.[^@.]+/.test(email);
  },
};
```

### Data Structures (Stateful Grouping)

Even if you bundle data and stateful functions together, if you’re not limiting the visibility of any of it, then you’re stopping short of the POLE aspect of encapsulation

```javascript
// data structure, not module
var Student = {
  records: [
    { id: 14, name: 'Kyle', grade: 86 },
    { id: 73, name: 'Suzy', grade: 87 },
    { id: 112, name: 'Frank', grade: 75 },
    { id: 6, name: 'Sarah', grade: 91 },
  ],
  getName(studentID) {
    var student = this.records.find((student) => student.id == studentID);
    return student.name;
  },
};
Student.getName(73);
// Suzy
```

Since records is publicly accessible data, not hidden behind a public API, Student here isn’t really a module.

### Modules (Stateful Access Control)

we not only need grouping and state, but also access control through visibility (private vs. public).

Let’s turn Student from the previous section into a module.

We’ll start with a form I call the “classic module,” which was originally referred to as the “revealing module” when it first emerged in the early 2000s.

```javascript
var Student = (function defineStudent() {
  var records = [
    { id: 14, name: 'Kyle', grade: 86 },
    { id: 73, name: 'Suzy', grade: 87 },
    { id: 112, name: 'Frank', grade: 75 },
    { id: 6, name: 'Sarah', grade: 91 },
  ];
  var publicAPI = { getName };
  return publicAPI;
  // ************************
  function getName(studentID) {
    var student = records.find((student) => student.id == studentID);
    return student.name;
  }
})();
Student.getName(73); // Suzy
```

Public APi method : `getName()` and access to the private hidden `records` data

### Module Factory (Multiple Instances)

```javascript
// factory function, not singleton IIFE
function defineStudent() {
  var records = [
    { id: 14, name: 'Kyle', grade: 86 },
    { id: 73, name: 'Suzy', grade: 87 },
    { id: 112, name: 'Frank', grade: 75 },
    { id: 6, name: 'Sarah', grade: 91 },
  ];
  var publicAPI = { getName };
  return publicAPI;
  // ************************
  function getName(studentID) {
    var student = records.find((student) => student.id == studentID);
    return student.name;
  }
}
var fullTime = defineStudent();

fullTime.getName(73);
// Suzy
```

define it as a normal standalone function,which is commonly referred to in this context as a “module factory” function.

###  Classic Module Definition

So to clarify what makes something a classic module:

- There must be an outer scope
- The module’s inner scope must have at least one piece of hidden information that represents state for the module.
- The module must return on its public API a reference to at least one function that has closure over the hidden module state (so that this state is actually preserved).

### Node CommonJS Modules

CommonJS modules are file-based; one module per file.

```javascript
// ************************
var records = [
  { id: 14, name: 'Kyle', grade: 86 },
  { id: 73, name: 'Suzy', grade: 87 },
  { id: 112, name: 'Frank', grade: 75 },
  { id: 6, name: 'Sarah', grade: 91 },
];
function getName(studentID) {
  var student = records.find((student) => student.id == studentID);
  return student.name;
}
```

As such, everything here is by default private to the module.

To expose something on the public API of a CommonJS module, you add a property to the empty object provided as module.exports.

recommend collecting them all together, either at the top or bottom of your file.

Some developers have the habit of replacing the default exports object, like this:

```javascript
// defining a new object for the API
module.exports = {
  // ..exports..
};
```

There are some quirks with this approach, including unexpected behavior if multiple such modules circularly depend on each other.

If you want to assign multiple exports at once, using object literal style definition, you can do this instead:

```javascript
Object.assign(module.exports, {
  // .. exports ..
});
```

Object.assign(..) is performing a shallow copy of all those properties onto the existing module.exports object

To include another module instance into your module/pro- gram, use Node’s require(..) method

```javascript
var Student = require('/path/to/student.js');
Student.getName(73);
// Suzy
```

require(..) is an all-or-nothing mechanism; it includes a reference of the entire exposed public API of the module.

```javascript
var getName = require('/path/to/student.js').getName;
// or alternately:
var { getName } = require('/path/to/student.js');
```

### Modern ES Modules (ESM)

The ESM format shares several similarities with the Com- monJS format. ESM is file-based, and module instances are singletons, with everything private by default.

One notable difference is that ESM files are assumed to be strict-mode

ESM uses an export keyword to expose something on the public API of the module.

```javascript
export getName;
// ************************
var records = [
  { id: 14, name: "Kyle", grade: 86 },
  { id: 73, name: "Suzy", grade: 87 },
  { id: 112, name: "Frank", grade: 75 },
  { id: 6, name: "Sarah", grade: 91 }
];
function getName(studentID) {
var student = records.find(
        student => student.id == studentID
    );
return student.name; }
```

ESM offers a fair bit of variation on how the export state- ments can be specified. For example:

```javascript
export function getName(studentID) {
  // ..
}
```

Another allowed variation:

```javascript
export default function getName(studentID) {
  // ..
}
```

This is a so-called “default export,” which has different se- mantics from other exports.

In essence, a “default export” is a shorthand for consumers of the module when they import, giving them a terser syntax when they only need this single default API member.

Non-default exports are referred to as “named exports.”

The import keyword—like export, it must be used only at the top level of an ESM outside of any blocks or functions— also has a number of variations in syntax.

```javascript
// named import
import { getName } from '/path/to/students.js';
getName(73); // Suzy
```

this form imports only the specifically named public API members from a module

Multiple API members can be listed inside the { .. } set

A named import can also be renamed with the as keyword

```javascript
import { getName as getStudentName } from '/path/to/students.js';
getStudentName(73); // Suzy
```

"default export":

```javascript
import getName from '/path/to/students.js';
getName(73); // Suzy
```

If you want to mix a default import with other named imports:

```javascript
import { default as getName /* .. others .. */ } from '/path/to/students.js';
getName(73); // Suzy
```

By contrast, the other major variation on import is called
“namespace import”:

```javascript
import * as Student from '/path/to/students.js';
Student.getName(73); // Suzy
```

As is likely obvious, the \* imports everything exported to the API, default and named, and stores it all under the single namespace identifier as specified.

### Exit Scope

POLE is the defensive private by default posture we always take, making sure we avoid over-exposure and interact only with the minimal public API surface area necessary.
