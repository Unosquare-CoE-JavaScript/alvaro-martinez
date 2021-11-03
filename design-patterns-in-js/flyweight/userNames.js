class User {
  // adam smith
  constructor(fullName) {
    this.fullName = fullName;
  }
}

class User2 {
  // adam smith
  constructor(fullName) {
    let getOrAdd = function (s) {
      let idx = User2.strings.indexOf(s);
      if (idx !== -1) {
        return idx;
      }
      User2.strings.push(s);
      return User2.strings.length - 1;
    };
    this.names = fullName.split(' ').map(getOrAdd);
  }
}
User2.strings = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let randomString = function () {
  let result = [];
  for (let x = 0; x < 10; x++) {
    result.push(String.fromCharCode(65 + getRandomInt(26)));
  }
};

let firstNames = [];
let lastNames = [];

let users = [];
let users2 = [];

for (let i = 0; i < 100; ++i) {
  firstNames.push(randomString());
  lastNames.push(randomString());
}

for (let first of firstNames) {
  for (let last of lastNames) {
    users.push(new User(`${first} ${last}`));
    users2.push(new User2(`${first} ${last}`));
  }
}

console.log(`10 k users tak up approx ${JSON.stringify(users).length} chars`);

let users2Length = [users2, User2.strings]
  .map((x) => JSON.stringify(x).length)
  .reduce((acc, val) => acc + val, 0);
console.log(`10 k users tak up approx ${users2Length} chars`);
