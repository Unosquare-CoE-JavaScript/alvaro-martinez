const readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const async = require('async');

class HotDrink {
  consume() {}
}

class Tea extends HotDrink {
  consume() {
    console.log('this tea is nice with lemon');
  }
}

class Coffee extends HotDrink {
  consume() {
    console.log('Coffee is delicious');
  }
}

class HotDrinkFactory {
  prepare(amount) {}
}

class TeaFactory extends HotDrinkFactory {
  prepare(amount) {
    console.log(`put int tea bag, boil water,pour ${amount} ml`);
    return new Tea();
  }
}

class CoffeeFactory extends HotDrinkFactory {
  prepare(amount) {
    console.log(`Grind some beans, boil water, pour ${amount} ml`);
    return new Coffee();
  }
}

class HotDrinkMachine {
  makeDrink(type) {
    switch (type) {
      case 'tea':
        return new TeaFactory().prepare(200);
      case 'coffee':
        return new CoffeeFactory().prepare(120);
      default:
        throw new Error();
    }
  }

  interact(consumer) {
    rl.question(
      'Please specify drink and amount ' + '(e.g., tea 50): ',
      (answer) => {
        let parts = answer.split(' ');
        let name = parts[0];
        let amount = parseInt(parts[1]);
        let d = this.factories[name].prepare(amount);
        rl.close();
        consumer(d);
      }
    );
  }
}
let machine = new HotDrinkMachine();
// rl.question('which drink? ', function(answer)
// {
//   let drink = machine.makeDrink(answer);
//   drink.consume();
//
//   rl.close();
// });
machine.interact(function (drink) {
  drink.consume();
});

class Person {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class PersonFactory {
  createPerson(name) {}
}

// Factory method is a static metodh that create objecs
// A fcatory is any entity that can take care of object creation
// A factory can be external or reside inside the object as an inner class
// hierarchies of factories can be used to created related objects
