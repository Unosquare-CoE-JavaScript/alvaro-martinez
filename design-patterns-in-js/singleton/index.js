class Singleton {
  constructor() {
    const instance = this.constructor.instance;
    if (instance) {
      return instances;
    }
    this.constructor.instance = this;
  }
}

const s1 = new Singleton();
