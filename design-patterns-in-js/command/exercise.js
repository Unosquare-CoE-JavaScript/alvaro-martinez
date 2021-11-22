let Action = Object.freeze({
  deposit: 0,
  withdraw: 1,
});

class Account {
  constructor() {
    this.balance = 0;
  }

  process(cmd) {
    switch (cmd.cmd) {
      case Action.deposit:
        this.balance += cmd.amount;
        cmd.success = true;
        break;
      case Action.withdraw:
        if (cmd.amount < this.balance) {
          cmd.success = false;
          return cmd;
        }
        this.balance -= cmd.amount;
        cmd.success = true;
        return cmd;
      default:
        break;
    }
  }
}

class Command {
  constructor(cmd, amount) {
    this.cmd = cmd;
    this.amount = amount;
    this.success = false;
  }
}
