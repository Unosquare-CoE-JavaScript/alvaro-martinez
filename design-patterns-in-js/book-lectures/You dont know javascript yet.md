# You dont know javascript yet

_A good start always depends ona solid first step._

javascript is an artifact of marketing, Brendan Eich first conveived of the language, he code named it _Mocha_. And inside of Netscape was labeled _livescript_

the official name of the language specified by TC39 and formalized by the ECMA standars body is **ECMAScript**

Some people from companies work together the ECMA organization to bringth new specs. The specs comes from the stage-0 to stage-4.

The stage-0 is that someone fromTC39 thinks a worthy idea to the ECMAScript standart

[Link to proposals](https://github.com/tc39/proposals)

Just one version but Before existed some versions forked and reverse engineered

### the web rules everything about (js)

for the most part, the js defined in the specification and JS that runs in the browsers-engines is the same.

but are some differences that must be considered

sometimes th JS spec will dicted some new o refined behavior and could not match.

the TC39 willbacktrack sometimes because old Js framworks can brake with new features, they planned to add _contains()_ but it changed to _includes_ or the case with _flatten()_ it changed to _flat()_

### not all (web) JS

not all functions are present on JS enviroments like browsers, engines, etc, some add APIs to global scope.

in web _alert()_, _fetch()_ , _getCurrentLocation()_, are present on browsers or _fs.write()_ on node.js, people says "Js is so inconsistent" but is only that some of APIs are guests in that enviroments and not are part of JS specification

### its not always js

It is important to understant that dev tools that browsers includes inside are building to improve the developer experience (DX)

### Many faces

The term "paradigm" in programming language context refers to a broad mindset and aprproach to sctructuring code

Paradigm level code categories include procedural, object oriented(OO) and functional (FP)

Paradigms are neither right nor wrong.

- Procedutal style organizes code in a top-down, linear progrssion through a predetrmined set of operations usually collected together in related units called procedures
- OO styles organizes code by collecting logic and data together into units called classes
- FP organizes code into functions(pure computations as oppsed to procedures), and adaptations of those functions as values

### backwards and forwards

Backwards compatibility means that once something is ac-cepted as valid JS, there will not be a future change tothe language that causes that code to become invalid JS.

### Jumping the Gaps

using transpilers like babel to converts the ES6 to old code supported to could use the new features without break the scripts

### Filling the gaps

Not all JS code will work on new and old browsers, the old browsers not had all features and it requires a pollifyl that help to adapt new APIs

### What’s in an Interpretation?

Two types of programming languages: interpretaded or scripting and, compiled languages. Differents by have dynamic or static types.

with javascript is more complex to defined, for some people seems like a scripting language but for others the process to build a projects with javascript is complex from using tools to transpiled by babel, packed with webpack, parsed coded to an AST, passing for a binary intemediate representation and finally the JS VM execute the program, its a lot like a compiled language

### Web Assembly (WASM)

### DefinedJS

JS is an implementation from ECMAScript standard (version ES2019), multiparadigm, run in browsers and js enviroments, and compiled

## Chapter 2: Surveying JS

The best way to learn JS is to start writing JS.

### Each File is a Program

In JS, each standalone file is its own separate program.

the reason is around the error handling, and the form that JS treats the programs,
if one file may fail the next file will not necessary prevents from being processed.

**It's important to ensure that each file works properly**

the only way that multiples files act single program is sharing their state via the "global scope"

With the ES6 and the support module format, using the `<script="module">` tags it will treated as a single module

### Values

The most fundamental unit of information in a program is avalue.

Values comes in two forms in JS: **primitive** and **object**

- **strings** can be write with double quotes (`""`) or single quotes(`''`) or using the backthik ("``")

```javascript
var greetings = "Alvaro"

console.log(`Hello world, ${greetings}!`)

// will print
hello world, Alvaro
```

- **booleans** the values can be `false` or `true`
- **numbers**
- **null** and **undefined**
- **Symbol**

### Arrays And Objects

- Arrays are a special type of object that’scomprised of an ordered and numerically indexed list of data:

```javascript
names = ["Frank", "Kyle", "Peter", "Susan"];

names.length;
// 4

names[0];
// Frank

names[1];
// Kyle
```

- Objects are more general: an unordered, keyed collection of any various values. It access the element using a string location name(**key** or **property**)

```javascript
name = {
  first: "Kyle",
  last: "Simpson",
  age: 39,
  specialties: ["JS", "Table Tennis"],
};

console.log(`My name is${name.first}.`);
```

### Value Type Determination

using a `typeof` operator tells its buildin type

```javascript
typeof 42;
// "number

typeof "abc";
// "string"

typeof true;
// "boolean"

typeof undefined;
// "undefined"

typeof null;
// "object" -- oops, bug!
// typeof null unfortunately returns "object" not "null"

typeof {"a":1};
// "object"

typeof [1,2,3];
// "object"

typeof functionhello(){};
// "function"

```

Converting from one value type to another, such as fromstring to number, is referred to in JS as “coercion.”

### Declaring and Using Variables

in Js can write variables with declared value or empty value.

The `var` keyword declares a variable to be used in that part of the program

the `let` keyword has some differences to `var`, has more limited access to the variablem than `var`. this s called `block scope`

A third declaration form is `const`, if it’s declared, and cannot be re-assigned a different value later. Not allowed re-assignament in primitive values but allow mutation.

```javascript
var adult = true;
const country = "mexico";

if (adult) {
  var name = "Kyle";
  let age = 39;
  country = "peru"; // ERROR

  console.log("Shhh, this is a secret!");
}

console.log(name); // Kyle

console.log(age); // Error!
```

attempt to access the variable declared with let results in an error, because the scope where was declared is the if, and name was declared outside

This helps to limiting how widespread variable declarations in our programs

with `var`:

- the scopes is the wider

### Functions

The word "function" has a variety of meanings. in FP has a precise mathematical definition, in JS "procedure", Its a collection of statements that can be invoked one or more times, and may provided some inputs and give back one or more outputs

```javascript
function awesomeFunction(coolThings) {
  // ..
  return amazingStuff;
}
```

This is called a **function declaration** because it appears as a statement by itself, not as an expression in another statement.

In contrast to a **function declaration statement**, a function expression can be defined and assigned like this:

```javascript
// let awesomeFunction = ..
// const awesomeFunction = ..
var awesomeFunction = function (coolThings) {
  // ..
  return amazingStuff;
};
```

- Can return value using the `return`keyword
- can be assigned as properties

### Comparasions

in Js comparasions are different of any others programming languages.

In JS exists the operator `===` called "triple-equals", described as the "stric equality"

```javascript
3 === 3.0; // true
"yes" === "yes"; // true
null === null; // true
false === false; // true

42 === "42"; // false
"hello" === "Hello"; // false
true === 1; // false
0 === null; // false
"" === null; // false
null === undefined; // false
```

Not allow any sort of type conversion ("coercion") where other js comprasions do allow coercion

It's designed to `lie` in two cases of special values: `nan` and `-0`

```javascript
NaN === NaN; // false
0 === -0; // true
```

For comparasion with `NaN` we can use `Number.isNaN()` and for `-0` use `Object.is()`.

JS does not define `===` as structural equality for object values. Instead, `===` uses identity equality for object values.

In JS, all object values are held by reference.

```javascript
varx = [1, 2, 3];
// assignment is by reference-copy, so
// y references the *same* array as x,
// not another copy of it.
var y = x;

y === x; // true
y === [1, 2, 3]; // false
x === [1, 2, 3]; // false
```

JS does not provide a mechanism for structural equalitycomparison of object values, only reference identity compar-ison.

### Coercive Comparisons

Coercion means a value of one type being converted to its respective representation in another type (to whatever extent possible)

Few JS features draw more ire in the broader JS communitythan the==operator, generally referred to as the “looseequality” operator.

Generally on post is recomendated to avoid this operator and use === instead.

But the == operator performs an equiality comparasion similary to how the == performs.

if the types being compared ared different, the == differs from === in that it allows coercion before the comparasion.

Converts the types to the same on both sides then == does the same than ===

```typescript
Consider: 42 == "42"; // true
1 == true; // true
```

Thinking about to use only `===` to avoid coercive equality, but there is more thar `==` with coercive equality includes `<,>,<=,>=`

```javascript
var arr = ["1", "10", "100", "1000"];
for (leti = 0; i < arr.length && arr[i] < 500; i++) {
  // will run 3 times
}
```

### How We Organize in JS

Two major patterns for organizing code (data and behavior) are used broadly across the JS ecosystem: classes and modules.

The `patterns are not mutually exclusive. but in JS reqquires understanding both

### classes

A class in a program is a definition of a “type” of custom data structure that includes both data and behaviors that operate on that data.

### Class Inheritance

it is an other characteristic from object oriented, where

```javascript
class Publication {
  constructor(title, author, pubDate) {
    this.title = title;
    this.author = author;
    this.pubDate = pubDate;
  }
  print() {
    console.log(`Title:${this.title}By:${this.author}${this.pubDate}`);
  }
}

class BlogPost extends Publication {
  constructor(title, author, pubDate, URL) {
    super(title, author, pubDate);
    this.URL = URL;
  }
  print() {
    super.print();
    console.log(this.URL);
  }
}
```

### Modules

The module pattern has essentially the same goal as the class pattern, which is to group data and behavior together into logical units.

### Classic Modules

ES6 added a module syntax form to native JS syntax.

runs at least once, an return an "instance" with one or more functions

```javascript
function Publication(title, author, pubDate) {
  var publicAPI = {
    print() {
      console.log(`Title:${title}By:${author}${pubDate}`);
    },
  };
  return publicAPI;
}
```

Comparing these forms to the class forms, there are more similarities than differences.

There are other variations to this factory function form:

- AMD (Asynchronous Module Definition)
- UMD(Universal Module Definition)
- CommonJS (classic Node.js-style modules)

example

```javascript
var YDKJS = Book({
  title: "You Don't Know JS",
  author: "Kyle Simpson",
  publishedOn: "June 2014",
  publisher: "O'Reilly",
  ISBN: "123456-789",
});

YDKJS.print();

// Title: You Don't Know JS
// By: Kyle Simpson
// June 2014
// Publisher: O'Reilly
// ISBN: 123456-789
```

### ES Modules

ES modules (ESM), introduced to the JS language in ES6.

- no wrapping function todefinea module
- wrapping context is a file. one file, one module
- use the `export` keyword, if something is declared but not exported, then it stay hidden
- ESMs are, in effect,“singletons

```javascript
function printDetails(title, author, pubDate) {
  console.log(`Title:${title}By:${author}${pubDate}`);
}

export function create(title, author, pubDate) {
  var publicAPI = {
    print() {
      printDetails(title, author, pubDate);
    },
  };
  return publicAPI;
}
```

```javascript
import { create as createPub } from "publication.js";

function printDetails(pub, URL) {
  pub.print();
  console.log(URL);
}

export function create(title, author, pubDate, URL) {
  var pub = createPub(title, author, pubDate);
  var publicAPI = {
    print() {
      printDetails(pub, URL);
    },
  };
  return publicAPI;
}

import { create as newBlogPost } from "blogpost.js";

varforAgainstLet = newBlogPost(
  "For and against let",
  "Kyle Simpson",
  "October 27, 2014",
  "https://davidwalsh.name/for-and-against-let"
);

sforAgainstLet.print();

// Title: For and against let
// By: Kyle Simpson
// October 27, 2014
// https://davidwalsh.name/for-and-against-let
```

## Chapter 3: Digging tothe Roots of JS

Iteration

The iterator pattern defines a data structure called an “iter-ator” that has a reference to an underlying data source, which exposes a method like `next()`.Calling `next()`returns the next piece of data

### Consuming Iterators

with the ES6 its worked to consumed a data sources one value at a time, checking after each `next()` if its true or false and stope the iteration

```javascript
var it = /* .. */
// loop over its results one at a time
for (let val of it) {
  console.log(`Iterator value:${val}`);
}
// Iterator value: ..
// Iterator value: ..
// ..
```

Another mechanism to used fot consuming iterators is te `...` operator, used for `rest` and `spread`.

### iterables

an iterable is a value that can be iterated over. could be consumed more than once, and every time new instance would be created

can be :

- arrays
- maps - using the entries to do an iteration
- sets
- others

all built-in iterables have three forms available:

- keys-only (`keys()`)
- values-only (`values()`)
- entries (`entries()`)

### closures

its fundamental to understand.

the presence or lack of closures is sometimes the cause of bugs

So let’s define closure in a pragmatic and concrete way:

`Closure is when a function remembers and contin-ues to access variables from outside its scope, evenwhen the function is executed in a different scope.`

functions have closures, objects didnt

```javascript
function greeting(msg) {
  return function who(name) {
    console.log(`${msg},${name}!`);
  };
}

var hello = greeting("Hello");
var howdy = greeting("Howdy");

// inner functions was execute with two different messages and previously create 2 instances called hello and howdy and print using the messages with news names on every new instances

hello("Kyle");
// Hello, Kyle!

hello("Sarah");
// Hello, Sarah!

howdy("Grant");
// Howdy, Grant!
```

closures was useful with callbacks

### `this` Keyword

One common mis-conception is that a function’s `this` refers to the function itself.
another misconception is that `this` points the instance that a method belongs to.

a functions is defined and attached to scope via closure, the scope is the set of rules that controls how references to variables are resolved

also have another characteristic that influences their access, _execution context_

scope is static and contains fixed set of variables, in the other hand, _functions eexecution cpntext_ is dynamic, entirely dependent on how it is called

```javascript
function classroom(teacher) {
  return function study() {
    console.log(`${teacher}says to study${this.topic}`);
  };
}
var assignment = classroom("Kyle");

assignment(); // Kyle says to study undefined  -- Oops :(

varhomework = { topic: "JS", assignment: assignment };

homework.assignment(); // Kyle says to study JS

varotherHomework = { topic: "Math" };

assignment.call(otherHomework); // Kyle says to study Math
```

### Prototypes

a proto-type is a characteristic of an object, and specifically resolution of a property access.

A series of objects linked together via prototypes is called the“prototype chain.”

### Object Linkage

To define an object prototype linkage, you can create theobject using theObject.create(..)

```javascript
var homework = { topic: "JS" };

var otherHomework = Object.create(homework);

otherHomework.topic; // "JS"
```

## Chapter 4: The BiggerPicture