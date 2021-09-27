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

let witSetTimeout = function (time) {
  return new Promise((resolve, reject) => {
    if (isNaN(time)) {
      return reject("a number time is require");
    }
    setTimeout(() => {
      resolve("done");
    }, time);
  });
};
