class Document {}

class Machine {
  constructor() {
    if (this.constructor.name === "Machine") {
      throw new Error("Machine is abstract");
    }
  }
  print(doc) {}
  fax(doc) {}
  scan(doc) {}
}

class MultiFunctionprinter extends Machine {
  print(doc) {
    super.print(doc);
  }
  fax(doc) {
    super.print(doc);
  }
  scan(doc) {
    super.print(doc);
  }
}
class OldFashionedPrinter extends Machine {
  print(doc) {
    super.print(doc);
  }
  fax(doc) {
    //  not ok
    // principle of least surprise
    // super.print(doc);
  }
  scan(doc) {
    // not ok
    // super.print(doc);
  }
}
