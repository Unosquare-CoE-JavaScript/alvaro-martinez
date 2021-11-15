const names: Array<string> = []; // string[]

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('done');
  }, 200);
});

function merge<T, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergeObj = merge({ name: 'max' }, { age: 18 });

interface Lengthy {
  length: number;
}

function countandDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value';

  if (element.length === 1) {
    descriptionText = 'got 1 element.';
  } else if (element.length > 1) {
    descriptionText = 'Got ' + element.length + ' elements.';
  }
  return [element, descriptionText];
}

console.log(countandDescribe('Holla mundillo'));

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return 'vaue: ' + obj[key];
}

extractAndConvert({ name: 'alvaro', test: 12 }, 'test');

class DataStorage<T> {
  // prefer primitives before objects
  // can `extends number | string | boolean` to could use the methods from types and lock only primitives
  private data: T[] = [];
  constructor() {}

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }
  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();

textStorage.addItem('test');
textStorage.addItem('data');
textStorage.addItem('storage');

textStorage.removeItem('test');

console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

const objStorage = new DataStorage<object>();
objStorage.addItem({ name: 'max' });
objStorage.addItem({ name: 'manu' });
objStorage.addItem({ name: 'alvaro' });

objStorage.removeItem({ name: 'max' });

console.log(objStorage.getItems());
