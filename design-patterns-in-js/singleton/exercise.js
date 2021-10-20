class SingletonTester {
  static isSingleton(generator) {
    // todo
    let ob1 = generator();
    let ob2 = generator();

    return ob1 === ob2;
  }
}
