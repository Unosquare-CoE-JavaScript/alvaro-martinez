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

  greet() {
    console.log(
      `hi my names is ${this.name}`,
      `i live at ${this.address.toString()}`
    );
  }
}

class Serializer {
  constructor(types) {
    this.types = types;
  }
  markRecursive(object) {
    let idx = this.types.findIndex((t) => {
      return t.name === object.constructor.name;
    });
    if (idx !== -1) {
      object['typeIndex'] = idx;
      for (const key in object) {
        if (Object.hasOwnProperty(key)) {
          this.markRecursive(object[key]);
        }
      }
    }
  }

  reconstructRecursive(object) {
    if (object.hasOwnProperty('typeIndex')) {
      let type = this.types[object.typeIndex];
      let obj = new type();
      for (const key in object) {
        if (Object.hasOwnProperty(key) && object[key] != null) {
          obj[key] = this.clone.reconstructRecursive(object[key]);
        }
      }
      delete obj.typeIndex;
      return obj;
    }
    return object;
  }

  clone(object) {
    this.markRecursive(object);
    let copy = JSON.parse(JSON.stringify(object));
    return this.reconstructRecursive(copy);
  }
}

let john = new Person('John', new Address('street', 'london', 'uk'));

let jane = JSON.parse(JSON.stringify(john));
jane.name = 'jane';
jane.address.street = 'Calle street';

// it print the same data
console.log(john.toString());
console.log(jane.toString());

// this write before is not optimal because need to add 'deepCopy' for every new class and object
