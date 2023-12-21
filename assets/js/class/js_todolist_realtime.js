import { TodoRealtime as TODO } from "./js_todo_class_realtime.js";  // as等於別名，讓兩個名稱在代碼中都可使用
import { UID } from "./UID.js";

let todoApp = document.querySelector('#todo-app');
let todoUid = document.querySelector('#uid-app');

let uid = UID.read();

if (uid) {
    todoApp.classList.add('active');
    let elInput = document.querySelector('#todo-in');
    let elBtn = document.querySelector('#todo-add-btn');
    let elItem = document.querySelector('.todo-item');
    let elChangeUid = document.querySelector('#change-uid-btn');
    let todo = new TODO(elItem, uid);

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

    elChangeUid.addEventListener('click', (e) => {
        e.preventDefault();
        UID.clear();
        location.reload();
    })

    let elCurrentUid = document.querySelector('#current-uid');
    elCurrentUid.innerHTML = uid;

} else {
    todoUid.classList.add('active');

    let elUid = document.querySelector('#todo-uid');
    let elBtn = document.querySelector('#todo-uid-btn');
    console.log(elBtn);

    elBtn.addEventListener('click', (e) => {
        let value = elUid.value;
        if (value) {
            UID.write(value);
            location.reload();
        }
    })

    elUid.addEventListener('keyup', (e) => {
        if (e.key.toString().toUpperCase() == 'ENTER') {
            elBtn.click();
        }
    })

}