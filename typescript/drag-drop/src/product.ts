import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive, validate } from 'class-validator';

export class Product {
  @IsNotEmpty()
  title: string;
  @IsNumber()
  @IsPositive()
  price: number;
  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }

  getInfo() {
    return [this.title, `$${this.price}`];
  }
}

const products = [
  { title: 'carpet', price: 15.5 },
  { title: 'boook', price: 12.98 },
];

// const loadedProducts = products.map((prod) => {
//   return new Product(prod.title, prod.price);
// });

const loadedProducts = plainToClass(Product, products);

for (const prod of loadedProducts) {
  console.log(prod.getInfo());
}

const newPrd = new Product('', 12.98);
validate(newPrd).then((errors) => {
  if (errors.length > 0) {
    console.log('validation errors');
    console.log(errors);
  } else {
    console.log(newPrd.getInfo());
  }
});

const p1 = new Product('book', 12.98);
