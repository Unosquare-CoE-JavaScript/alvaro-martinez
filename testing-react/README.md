# Testing react with jest and testing library

## testing library

- test software the way that user actually use it
  - not internal implementation
  - fin elems. by accessibility markers, not by IDs
  - b

## jest vs RTL

RTL

- provides a virtual DOM for test

Jest

- Test runner
  - find, run tests
  - determines whether test pass or fail

### types of test

- unit test : test one unit of code
- integration test: how multiple unites work together
- functional test: tests a particular function of software
- aceptance/end to end (e2e):use actual browser and serve (cypress/selenium)

unit testing vs functional testing
unit: isolated, mock dependencies, test internals

- very easy to pinpoint failures

* Further from how user interact with sw
* more likely to breack with refactoring

functional: include all relevant units, test behavior

- close to how users interact with software
- robust tests

* more difficult to debug

---

### unit testing functions

functions separate from components

- used by several components
- complex logic

unit test if

- complex logi difficult to test via functional tests
- top many edges cases

---

ESlint

- popular linter
- keep code consistent , especially for multi-eng projects
- cath erros in code
  - using variables before defining
  - importing from nonexisting file

---

not wrapped in act(...) `warning`

- react updated element after test was finished
- testing library already does this for us+
  to determinate this error

- determinate what changes after the test is over (async)
- using `await waitForElementToBeRemove`

---

Mock service worker

- intercept network calls
- return specific responses
- prevent nerwork calls during tests
- set up test conditions using server response

---

Dont get intimidated by huge walls of text

--

passing a mock as a prop

using `jest.fn()`

- jest mock function
- does not do anything
- merely a placeholde to avoid errors

example

```jsx
<ScoopOption
  name='vanilla'
  imagePath='/images/vanilla.png'
  udpateItemCount={jest.fn()}
/>
```

what to render ?
do you need to passs any propos?
do we need to wrap in?
where should the tests go?
what to test?
how to test?
do we need to `await`?
