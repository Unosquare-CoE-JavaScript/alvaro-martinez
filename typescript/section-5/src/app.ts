interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;

add = (a: number, b: number) => a + b;

interface Greetable {
  name: string;
  greet(phrase: string): void;
}

let user1: Greetable;

user1 = {
  name: 'max',
  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  },
};
