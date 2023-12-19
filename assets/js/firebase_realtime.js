import { App } from "./firebase/APP.js";
import { Database } from "./firebase/Database.js";

let app = await App.init();
let database = new Database(app);

database.write('David', { name: 'David', age: 18, gender: 'male', items: [1, 2, 3, 4] })