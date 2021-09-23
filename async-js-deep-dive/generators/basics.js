// to convert a generator function add "*" before the function name
function* gentTest() {
  let x = 0;
  console.log(`start`);
  yield x++;
  console.log(x);
  x++;
  console.log(x);
  yield x++;
  console.log("end");
  return x;
}
/*
  the next code use the method "next()"
  to call the next "state" of the generator
  it repeat sometimes to finish 
  */

let gen = gentTest();

console.log(gen.next());
console.log(gen.next());

console.log(gen.next());
