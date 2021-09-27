let async1 = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Async1 has resolved");
    }, 4000);
  });
};

let async2 = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Async2 has resolved");
    }, 2000);
  });
};

let async3 = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Async3 has resolved");
    }, 7000);
  });
};

Promise.all([async1(), async2(), async3()]).then((msg) => {
  console.log(msg);
});
