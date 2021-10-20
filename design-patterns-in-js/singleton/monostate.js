class ChiefExecutiveOfficer {
  get name() {
    return ChiefExecutiveOfficer._name;
  }

  set name(value) {
    ChiefExecutiveOfficer._name = value;
  }

  get age() {
    return ChiefExecutiveOfficer._age;
  }

  set age(value) {
    ChiefExecutiveOfficer._age = value;
  }

  toString() {
    return `CEO's name is ${this.name} and age is ${this.age}`;
  }
}

ChiefExecutiveOfficer._age = undefined;
ChiefExecutiveOfficer._name = undefined;

let ceo = new ChiefExecutiveOfficer();
ceo.name = 'Juan';
ceo.age = 28;

let ceo2 = new ChiefExecutiveOfficer();
ceo2.name = 'Mar';
ceo2.age = 29;

// print the same last values
console.log(ceo.toString());
console.log(ceo2.toString());
