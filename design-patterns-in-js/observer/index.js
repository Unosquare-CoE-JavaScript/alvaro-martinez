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

class Person {
  constructor(address) {
    this.address = address;
    this.faillsIll = new Event();
  }
  catchCold() {
    this.faillsIll.fire(this, new FallsIllArgs(this.address));
  }
}

let per = new Person('rumani 123');
let sub = per.faillsIll.subscribe((s, a) => {
  console.log(`doctor has been called to ${a.address}`);
});
per.catchCold();
per.catchCold();
