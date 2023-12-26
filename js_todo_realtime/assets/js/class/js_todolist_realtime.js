import { TodoRealtime as TODO } from "./js_todo_class_realtime.js";  // as等於別名，讓兩個名稱在代碼中都可使用
// import { UID } from "./UID.js";
import { App } from "../firebase/APP.js";
import { Auth } from "../firebase/Auth.js"

import { Database } from "../firebase/Database.js";

const app = await App.init(); //App的init()是async非同步，要用await
const auth = new Auth(app);

let email = 'aaa123@gmail.com'
let password = '12345678'

// let user = await auth.register(email, password); 先讓user註冊
// let user = await auth.signIn(email, password);user註冊完再登入


let todoApp = document.querySelector('#todo-app');
let todoUid = document.querySelector('#uid-app');

let isRegisterMode = false;

// let uid = UID.read();

const authed = async (user) => {
    if (isRegisterMode) {
        todoUid.classList.remove('active');
        await Swal.fire({
            title: '註冊成功',
            html: `註冊成功，請登入`,
            icon: 'success'
        })
        location.reload();
        return;
    }

    let uid = user.uid;

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

    elChangeUid.addEventListener('click', async (e) => {
        e.preventDefault();
        await auth.signOut();
        location.reload();
    })

    let elCurrentUid = document.querySelector('#current-uid');
    elCurrentUid.innerHTML = uid;
}

const unauthed = () => {
    todoUid.classList.add('active');

    // firebase已加入反改寫規則，測試firebase是否會再被外部寫入
    let db = new Database(app);
    db.write(`todo/wtxYxlMbZAWfiHsg2OnvQht7SvN2`, [{ text: '112233', checked: false }])

    let elAccount = document.querySelector('#todo-account');
    let elPassword = document.querySelector('#todo-password');

    let elSignInBtn = document.querySelector('#todo-signin-btn');

    elSignInBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        let account = elAccount.value;
        let password = elPassword.value

        if (!account) {
            await Swal.fire({
                title: '登入失敗',
                html: '帳號錯誤',
                icon: 'error'
            })
            setTimeout(() => {
                elAccount.focus();
            }, 500)
            return
        }

        if (!password) {
            await Swal.fire({
                title: '登入失敗',
                html: '密碼錯誤',
                icon: 'error'
            })
            setTimeout(() => {
                elPassword.focus();
            }, 500)
            return
        }

        isRegisterMode = false;

        let user = await auth.signIn(account, password);
        if (user) {
            todoUid.classList.remove('active');
            await Swal.fire({
                title: '登入成功',
                html: `登入帳號為${account}`,
                icon: 'success'
            })
        } else {
            await Swal.fire({
                title: '登入失敗',
                html: `帳號密碼錯誤`,
                icon: 'error'
            })
        }
    })

    let elRegisterBtn = document.querySelector('#todo-register-btn');
    console.log(elRegisterBtn);

    elRegisterBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        console.log(1)
        let account = elAccount.value;
        let password = elPassword.value;

        if (!account) {
            await Swal.fire({
                title: '註冊失敗',
                html: '帳號錯誤',
                icon: 'error'
            })
            setTimeout(() => {
                elAccount.focus();
            }, 500)
            return
        }

        if (!password) {
            await Swal.fire({
                title: '註冊失敗',
                html: '密碼錯誤',
                icon: 'error'
            })
            setTimeout(() => {
                elPassword.focus();
            }, 500)
            return
        }

        isRegisterMode = true;
        let user = await auth.register(account, password);
        if (user) {
            await auth.signOut();
            elAccount.value = '';
            elPassword.value = '';
        } else {
            Swal.fire({
                title: '註冊失敗',
                html: `請重新輸入`,
                icon: 'error'
            })
        }
    })
}

auth.onChange(authed, unauthed);


// if (uid) {
//     todoApp.classList.add('active');
//     let elInput = document.querySelector('#todo-in');
//     let elBtn = document.querySelector('#todo-add-btn');
//     let elItem = document.querySelector('.todo-item');
//     let elChangeUid = document.querySelector('#change-uid-btn');
//     let todo = new TODO(elItem, uid);

//     const addTodo = () => {
//         let value = elInput.value;
//         if (!value) {
//             elInput.focus();
//             return
//         }

//         elInput.value = '';
//         elInput.focus();

//         todo.add(value);
//         todo.render();
//     }

//     elBtn.addEventListener('click', (e) => {
//         addTodo();
//     })

//     elInput.addEventListener('keyup', (e) => {
//         if (e.key.toString().toUpperCase() == 'ENTER') {
//             addTodo();
//         }
//     })

//     elChangeUid.addEventListener('click', (e) => {
//         e.preventDefault();
//         UID.clear();
//         location.reload();
//     })

//     let elCurrentUid = document.querySelector('#current-uid');
//     elCurrentUid.innerHTML = uid;

// } else {
//     todoUid.classList.add('active');

//     let elUid = document.querySelector('#todo-uid');
//     let elBtn = document.querySelector('#todo-uid-btn');
//     console.log(elBtn);

//     elBtn.addEventListener('click', (e) => {
//         let value = elUid.value;
//         if (value) {
//             UID.write(value);
//             location.reload();
//         }
//     })

//     elUid.addEventListener('keyup', (e) => {
//         if (e.key.toString().toUpperCase() == 'ENTER') {
//             elBtn.click();
//         }
//     })
// }