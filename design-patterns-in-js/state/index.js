class Switch {
  constructor() {
    this.state = new OffState();
  }

  on() {
    this.state.on(this);
  }

  off() {
    this.state.off(this);
  }
}

class State {
  constructor() {
    if (this.constructor === State) {
      throw new Error('abstract');
    }
  }
  on(sw) {
    console.log('light is on');
  }

  off(sw) {
    console.log('ligth is off');
  }
}

class OnState extends State {
  constructor() {
    super();
    console.log('turnn light on');
  }

  off(sw) {
    console.log('turning light off');
    sw.state = new OffState();
  }
}

class OffState extends State {
  constructor() {
    super();
    console.log('turnn light off');
  }

  on(sw) {
    console.log('turning light on');
    sw.state = new OnState();
  }
}

let sw = new Switch();

sw.on();
sw.on();
sw.off();
