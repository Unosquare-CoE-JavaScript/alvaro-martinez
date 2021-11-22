const userName = 'max';

let age = 30;
age = 29;

// const add = (a: number, b: number = 1) => a + b;

const printOutput: (a: number | string) => void = (output) => {
  console.log(output);
};
const button = document.querySelector('button');

if (button) {
  button.addEventListener('click', (event) => console.log(event));
}

// printOutput(add(5));

const hobbies = ['sports', 'cooking'];

const activeHobbies = ['hikin g'];

activeHobbies.push(...hobbies);

const person = {
  name: 'max',
  age: 30,
};

const copiedPerson = { ...person };

const add = (...numbers: number[]) => {
  return numbers.reduce((acc, cur) => acc + cur, 0);
};

const addedNumbers = add(5, 1, 3, 8, 4);
console.log(addedNumbers);

const [hobby1, hobby2] = hobbies;
console.log(hobby1, hobby2);

const { age: age1, name: name2 } = person;

console.log(age1, name2);
