class GraphicObject {
  constructor(name = 'group' + GraphicObject.count++) {
    this._name = name;
    this.color = undefined;
    this.children = [];
  }

  get name() {
    return this._name;
  }

  print(buffer, depth) {
    buffer.push('*'.repeat(depth));
    if (depth > 0) {
      buffer.push(' ');
    }
    if (this.color) {
      buffer.push(this.color + ' ');
      buffer.push(this.name);
      buffer.push('\n');

      for (const chidl of this.children) {
        chidl.print(buffer.depth + 1);
      }
    }
  }

  toString() {
    let buffer = [];
    this.print(buffer, 0);
    return buffer.join(' ');
  }
}

GraphicObject.count = 0;

class Circle extends GraphicObject {
  constructor(color) {
    super('cirlce');
    this.color = color;
  }
}

class Square extends GraphicObject {
  constructor(color) {
    super('square');
    this.color = color;
  }
}

let drawing = new GraphicObject();
drawing.children.push(new Square('Red'));
drawing.children.push(new Circle('Yellow'));

let group = new GraphicObject();
group.children.push(new Square('Red'));
group.children.push(new Circle('Red'));

drawing.children.push(group);

console.log(drawing.toString());
