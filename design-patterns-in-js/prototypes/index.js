class Address {
  constructor(street, city, country) {
    this.street = street;
    this.city = city;
    this.country = country;
  }

  // after add this method the name on console.log change, but address is the same
  deepCopy() {
    return new Address(this.street, this.city, this.country);
  }

  toString() {
    return `Address: ${this.street}, ${this.city}, ${this.country}`;
  }
}

class Person {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }
  // after add this method the name on console.log change, but address is the same
  deepCopy() {
    return new Person(this.name, this.address);
  }

  toString() {
    return `${this.name} lives at ${this.address}`;
  }
}

let john = new Person('John', new Address('street', 'london', 'uk'));

let jane = john;
jane.name = 'jane';
jane.address.street = 'Calle street';

// it print the same data
console.log(john.toString());
console.log(jane.toString());

// this write before is not optimal because need to add 'deepCopy' for every new class and object
