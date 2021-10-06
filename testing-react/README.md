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

+ very easy to pinpoint failures

- Further from how user interact with sw
- more likely to breack with refactoring

functional: include all relevant units, test behavior 
+ close to how users interact with software 
+ robust tests

- more difficult ti debug 



