type Combinable = number | string;
type ConversionDesc = 'as-number' | 'as-text';
function combine(
  input1: Combinable,
  input2: Combinable,
  resultConvertion: ConversionDesc
) {
  let result;
  if (
    (typeof input1 === 'number' && typeof input2 === 'number') ||
    resultConvertion === 'as-number'
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  // if (resultConvertion === 'as-number') {
  //   return +result;
  // } else {
  //   return result.toString();
  // }
}

const combineAges = combine(30, 26, 'as-number');
console.log(combineAges);

const combineStringAges = combine(30, 26, 'as-number');

console.log(combineAges);
const combineNames = combine('max', 'anna', 'as-text');
console.log(combineNames);
