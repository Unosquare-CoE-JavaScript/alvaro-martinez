class Event {
  constructor() {
    this.handlers = new Map();
    this.count = 0;
  }

  subscribe(handler) {
    this.handlers.set(++this.count, handler);
    return this.count;
  }

  unsubscribe(idx) {
    this.handlers.delete(idx);
  }
  // who fired the event ?
  // additional data
  fire(sender, args) {
    this.handlers.forEach((v, k) => v(sender, args));
  }
}

class FallsIllArgs {
  constructor(address) {
    this.address = address;
  }
}

class PropertyChangeArgs {
  constructor(name, newVal) {
    this.name = name;
    this.newValue = newVal;
  }
}

class Person {
  constructor(age) {
    this._age = age;
    this.propertyChange = new Event();
  }
  get age() {
    return this._age;
  }

  set age(val) {
    if (!val || this._age === val) {
      return;
    }

    let oldcanVote = this.canVote;

    this._age = val;
    this.propertyChange.fire(this, new PropertyChangeArgs('age', val));
    if (oldcanVote !== this.canVote) {
      this.propertyChange.fire(this, new PropertyChangeArgs('canVote', val));
    }
  }
  get canVote() {
    return this._age >= 16;
  }
}

class RegistrationChecker {
  constructor(person) {
    this.person = person;
    this.token = person.propertyChange.subscribe(this.age_change.bind(this));
  }

  age_change(sender, args) {
    if (sender === this.person && args.name === 'age') {
      if (args.newValue < 13) {
        console.log('sorry, still too young');
      } else {
        console.log('can you register');
        sender.propertyChange.unsubscribe(this.token);
      }
    }
  }
  get canVote() {
    return this._age >= 16;
  }
}

class VotingChecker {
  constructor(person) {
    this.person = person;
    this.person.propertyChange.subscribe(this.voting_changed.bind(this));
  }

  voting_changed(sender, args) {
    if (sender === this.person && args.name === 'canVote') {
      console.log('voting status changed to ' + args.newValue);
    }
    return;
  }
}

let per = new Person('rumani');

for (let i = 10; i < 20; i++) {
  console.log('changing age to ' + i);
  per.age = i;
}
