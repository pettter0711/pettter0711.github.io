import { TODO } from "./class/js_todo_class.js";

let elInput = document.querySelector('#todo-in');
let elBtn = document.querySelector('#todo-add-btn');
let elItem = document.querySelector('.todo-item');
let todo = new TODO(elItem);

const addTodo = () => {
    let value = elInput.value;
    if (!value) {
        elInput.focus();
        return
    }

    elInput.value = '';
    elInput.focus();

    todo.add(value);
    todo.render();
}

elBtn.addEventListener('click', (e) => {
    addTodo();
})

elInput.addEventListener('keyup', (e) => {
    if (e.key.toString().toUpperCase() == 'ENTER') {
        addTodo();
    }
})