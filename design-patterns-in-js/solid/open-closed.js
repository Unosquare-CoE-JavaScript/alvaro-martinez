let Color = Object.freeze({
  red: `red`,
  blue: "blue",
  green: "green",
});

let Sizes = Object.freeze({
  small: "small",
  medium: "medium",
  large: "large",
});

class Product {
  constructor(name, color, size) {
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

// open for extension, closed for modification
class ProductFilter {
  filtersByColor(products, color) {
    return products.filter((p) => p.color === color);
  }
  // It is not good, because it have been modified and break the princicle
  // instead we can  do the next (1)
  filtersBySize(products, size) {
    return products.filter((p) => p.size === size);
  }
}

/*
  we can use the specificatiion pattern, using a class 
  and passing a list of speficication to filter and avoid to
  modify the actual class
*/

// specification

class ColorSpecification {
  constructor(color) {
    this.color = color;
  }

  isSatisfied(item) {
    return item.color === this.color;
  }
}

class SizeSpecification {
  constructor(size) {
    this.size = size;
  }

  isSatisfied(item) {
    return item.size === this.size;
  }
}

class Andspecification {
  constructor(...specs) {
    this.specs = specs;
  }

  isSatisfied(item) {
    return this.specs.every((x) => x.isSatisfied(item));
  }
}

let apple = new Product("Apple", Color.green, Sizes.small);
let tree = new Product("Tree", Color.green, Sizes.large);
let house = new Product("house", Color.blue, Sizes.large);

let products = [apple, tree, house];

let pf = new ProductFilter();
let pFiltered = pf.filtersByColor(products, Color.green);
console.log(pFiltered);
// using a better filter

class BeeterFilter {
  filter(items, spec) {
    return items.filter((x) => spec.isSatisfied(x));
  }
}

let bf = new BeeterFilter();
console.log("new  way to filter ");

for (const p of bf.filter(products, new ColorSpecification(Color.green))) {
  console.log(`* ${p.name} is green`);
}

console.log("green and large products: ");

let spec = new Andspecification(
  new ColorSpecification(Color.green),
  new SizeSpecification(Sizes.large)
);

for (const p of bf.filter(products, spec)) {
  console.log(`* ${p.name} is green`);
}
