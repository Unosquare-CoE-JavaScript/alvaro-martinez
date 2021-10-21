class Connectable {
  conectTo(other) {
    for (let from of this) {
      for (let to of other) {
        from.out.push(to);
        to.in.push(from);
      }
    }
  }
}

class Neuron extends Connectable {
  constructor() {
    super();
    this.in = [];
    this.out = [];
  }

  // conectTo(other) {
  //   this.out.push(other);
  //   other.in.push(this);
  // }

  toString() {
    return `a neuron with ${this.in.length} inputs and ${this.out.length} outputs`;
  }
}

class NeuronLayer extends Array {
  constructor(count) {
    super();
    while (count-- > 0) {
      this.push(new Neuron());
    }
  }

  toString() {
    return `a neuron layer with ${this.length} neurons`;
  }
}

let n1 = new Neuron();
let n2 = new Neuron();
let n3 = new Neuron();

let nl1 = new NeuronLayer(5);
let nl2 = new NeuronLayer(4);

n1.conectTo(nl2);
n2.conectTo(n3);

nl1.conectTo(n1);
nl2.conectTo(n3);

console.log(n1.toString());
console.log(n2.toString());

console.log(nl1.toString());
console.log(nl2.toString());
