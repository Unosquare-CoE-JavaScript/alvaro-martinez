// to convert a generator function add "*" before the function name
function gentTest() {
  let x = 0;
  console.log(`start`);
  x++;
  console.log(x);
  x++;
  console.log(x);
  x++;
  console.log("end");
  return x;
}

gentTest();
