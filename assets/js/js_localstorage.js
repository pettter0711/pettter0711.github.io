let students = [];
students.push({ name: 'David', age: 18 });
students.push({ name: 'John', age: 20 });

localStorage.setItem('students', students);

let storageStr = JSON.stringify(students);
localStorage.setItem('students', storageStr);

let reader = localStorage.getItem(students);
console.log(reader);

let deserializeReader = JSON.parse(reader);
console.log(deserializeReader);


