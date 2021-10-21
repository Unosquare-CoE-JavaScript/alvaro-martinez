class SingleValue {
  constructor(value) {
    this.value = value;
  }
}

class ManyValues {
  constructor() {
    this.values = [];
  }
  // ensure there's a push(value) method
  push(value) {
    this.values.push(value);
  }
}

let sum = function (containers) {
  // todo
  return containers.reduce((acc, val) => {
    return (acc += val.value
      ? val.value
      : val.values.reduce((acc, val) => acc + val, 0));
  }, 0);
};

let singleValue = new SingleValue(11);
let othersValues = new ManyValues();
othersValues.push(22);
othersValues.push(33);

console.log(sum([singleValue, othersValues]), 66);
