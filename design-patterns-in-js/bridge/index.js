class VectorRenderer {
  renderCircle(radius) {
    console.log(`drawing a circle of readius ${radius}`);
  }
}

class RasterRenderer {
  renderCircle(radius) {
    console.log(`drawing a pixels of circle of readius ${radius}`);
  }
}

class Shape {
  constructor(renderer) {
    this.renderer = renderer;
  }
}

class Circle extends Shape {
  constructor(renderer, radius) {
    super(renderer);
    this.radius = radius;
  }

  draw() {
    this.renderer.renderCircle(this.radius);
  }

  resize(factor) {
    this.radius *= factor;
  }
}

class Square {}

let raster = new RasterRenderer();
let vector = new VectorRenderer();
let circle = new Circle(raster, 5);

circle.draw();

circle.resize(2);

circle.draw();
