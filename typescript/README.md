## core types

numeber | 1, 5.3, -10 | all numbers
string | "hi", 'Hi', `h` | all text values
boolean | true, false | just two
object | {age:30} | any object in js
Array | [1,2,3] | any JS array
tuple | [1,2]
types in TS(typescript) are **lowercase**
ENUM | enum {NEW,OLD} | added by TS, auto enumerated global constants ids
any | \* | any kind of value

```typescript
// js object
const product = {
  id: 'abc1',
  price: 12.99,
  tags: ['great-offer', 'hot-and-new'],
  details: {
    title: 'Red Carpet',
    description: 'A great carpet - almost brand-new!',
  },
};

// types from TS
{
  id: string;
  price: number;
  tags: string[];
  details: {
    title: string;
    description: string;
  }
}
```

Type Aliases & Object Types

Type aliases can be used to "create" your own types.
also provide an alias to complex types

```typescript
type User = { name: string; age: number };
const u1: User = { name: 'Max', age: 30 }; // this works!
```
