enum Role {
  ADMIN = 'ADMIN',
  READ_ONLY = 100,
  AUTHOR0 = 'AUTHOR',
}

const person = {
  name: 'max',
  age: 40,
  hobbies: ['sports', 'cooking'],
  role: Role.ADMIN,
};

//person.role.push('admin');
//person.role[1] = 10;

let favoriteActivities: string[];
favoriteActivities = ['sports'];

for (let hobby of person.hobbies) {
  console.log(hobby);
}

console.log(person.name);
