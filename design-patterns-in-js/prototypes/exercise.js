class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Line {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  deepCopy() {
    return new Line(
      new Point(this.start.x, this.start.y),
      new Point(this.end.x, this.end.y)
    );
  }

  toString() {
    return `start: ${this.start.x}, ${this.start.y}. end: ${this.end.x} ${this.end.y}`;
  }
}

let base = new Line(new Point(0, 0), new Point(0, 10));

console.log(base);
let copy1 = base.deepCopy();
copy1.start.x = 10;
copy1.end.y = 20;
console.log(copy1);
