const fibonacci = function (len, nums = [0, 1]) {
  let [num1, num2] = nums;
  let next;
  let cnt = 2;

  while (cnt < len) {
    next = num1 + num2;
    num1 = num2;
    num2 = next;
    nums.push(next);
    cnt++;
  }
  return nums;
};

let fib = fibonacci(5);
console.log(fib);
