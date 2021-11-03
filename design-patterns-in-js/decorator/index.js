class Shape {
  constructor(color) {
    this.color = color;
  }
}

class Circle extends Shape {
  constructor(radius = 0) {
    super();
    this.radius = radius;
  }

  resize(factor) {
    this.radius *= factor;
  }

  toString() {
    return `a circle of radius ${this.radius}`;
  }
}

class ColoredShaped extends Shape {
  constructor(shape, color) {
    super();
    this.shape = shape;
    this.color = color;
  }
  toString() {
    return `${this.shape.toString()} has the color ${this.color}`;
  }
}

class TransparentShape extends Shape {
  constructor(shape, transparency) {
    super();
    this.shape = shape;
    this.transparency = transparency;
  }
  toString() {
    return `${this.shape.toString()} has a trasparency ${
      this.transparency * 100.0
    }`;
  }
}

let circle = new Circle(5);
console.log(circle.toString());

let coloredCircle = new ColoredShaped(circle, 'blue');
console.log(coloredCircle.toString());

let trasparencyCircle = new TransparentShape(coloredCircle, 0.5);
console.log(trasparencyCircle.toString());
