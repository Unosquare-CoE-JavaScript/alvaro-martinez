function add(n1: number, n2: number): number {
  return n1 + n2;
}

function printResult(num: number): void {
  console.log(`result: ${num}`);
}

function addAndHandler(n1: number, n2: number, cb: (num: number) => void) {}

printResult(add(5, 12));

let combineValues: (a: number, b: number) => number;

combineValues = add;
// combineValues = 5; Type Error

console.log(combineValues(8, 8));

addAndHandler(10, 20, (result) => {
  console.log(result);
});
