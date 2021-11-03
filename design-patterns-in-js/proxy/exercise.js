class Person {
  constructor(age) {
    this.age = age;
  }

  drink() {
    return 'drinking';
  }

  drive() {
    return 'drive';
  }

  drinkAndDrive() {
    return this.drink() + ' ' + this.drive();
  }
}
class ResponsiblePerson {
  constructor(person) {
    this.person = person;
  }

  drink() {
    if (this.person.age < 18) {
      return ' too young';
    }
    return this.person.drink();
  }

  drive() {
    if (this.person.age >= 16) {
      return this.person.drive();
    }
    return 'too young';
  }

  drinkAndDrive() {
    return 'dead';
  }
}

let p = new Person(16);

let rp = new ResponsiblePerson(p);

console.log(rp.drink());

let p2 = new Person(18);

let rp2 = new ResponsiblePerson(p2);
console.log(rp2.drink());
