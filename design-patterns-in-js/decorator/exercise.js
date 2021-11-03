class Bird {
  constructor(age) {
    this.age = age;
  }

  fly() {
    return this.age ? 'can fly' : 'no faly :(';
  }
}

class Lizard {
  constructor(age) {
    this.age = age;
  }

  crawl() {
    return this.age ? 'can crawl' : 'not crawl';
  }
}

class Dragon {
  constructor(age) {
    this.age = age;
    this.lizard = new Lizard(age);
    this.bird = new Bird(age);
  }

  crawl() {
    return this.lizard.crawl();
  }
  fly() {
    return this.bird.fly();
  }
}

console.log(new Dragon(2).crawl());
