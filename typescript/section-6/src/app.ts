type Admin = { name: string; privileges: string[] };

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'Max',
  startDate: new Date('04-04-2020'),
  privileges: ['create-server'],
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add('max ', 'steel');
result.split(' ');

const fetchedUserData = {
  id: 'u1',
  name: 'max',
  job: { title: 'ceo', description: 'my own company' } /* optional chaining */,
};

console.log(fetchedUserData?.job?.title);

const userInput = undefined;

const storedData = userInput ?? 'default';

console.log(storedData);

// type UnknownEmployee = Employee | Admin;

// function printEmployeeInformation(empl: UnknownEmployee) {
//   console.log('name: ' + empl.name);
//   if ('privileges' in empl) {
//     console.log(empl.privileges);
//   }
//   if ('startDate' in empl) {
//     console.log(`start date: ` + empl.startDate);
//   }
// }
// printEmployeeInformation(e1);

// class Car {
//   drive() {
//     console.log('driving...');
//   }
// }

// class Truck {
//   constructor() {}
//   drive() {
//     console.log('driving...');
//   }
//   loadCargo(amount: number) {
//     console.log('loading cargo... ' + amount);
//   }
// }

// type Vehicle = Car | Truck;

// const v1 = new Car();
// const v2 = new Truck();

// function useVehicle(vehicle: Vehicle) {
//   vehicle.drive();

//   // if ('loadCargo' in vehicle) {
//   if (vehicle instanceof Truck) {
//     vehicle.loadCargo(1000);
//   }
// }
// useVehicle(v1);
// useVehicle(v2);

// interface Bird {
//   type: 'bird';
//   flyingSpeed: number;
// }

// interface Horse {
//   type: 'horse';
//   runningSpeed: number;
// }

// type Animal = Bird | Horse;

// function moveAnimal(animal: Animal) {
//   let speed;
//   switch (animal.type) {
//     case 'bird':
//       speed = animal.flyingSpeed;
//       break;
//     case 'horse':
//       speed = animal.runningSpeed;
//       break;
//   }
//   console.log('moving with speed: ' + speed);
// }

// moveAnimal({ type: 'bird', flyingSpeed: 10 });

// const userInputElement = document.getElementById(
//   'message-output'
// ) as HTMLInputElement;
// userInputElement.value = 'hi there';

// interface ErrorContainer {
//   [prop: string]: string;
// }

// const errorBag: ErrorContainer = {
//   email: 'not a valid email',
//   userName: 'not valid username, must start with capital character',
// };
