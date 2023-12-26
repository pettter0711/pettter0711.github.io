import { TODO_API } from "./js_todo_api.js";
import { LocalStorage } from "./LocalStorage.js";

class TODO {
    #items
    #el
    #storage
    #uid;

    constructor(el, uid = 'todo') {
        this.#items = [];
        this.#el = el;
        this.#storage = new LocalStorage(uid);
        this.#uid = uid;
        this.init();
    }

    add(text) {
        if (text) {
            this.#items.push({ checked: false, text: text });
        }
        this.write();
    }

    async write() {
        await TODO_API.update(this.#uid, this.#items);
    }

    // write() {
    //     this.#storage.write('todo', this.#items);
    // }

    async read() {
        return await TODO_API.get(this.#uid);
        // return this.#storage.read('todo', []);
    }
    // TODO_API.get 是非同步狀態，所以在這裡的read功能也必須用async await

    checkedToggle(index) {
        if (this.#items[index]) {
            this.#items[index].checked = !this.#items[index].checked;
            this.write();
            this.render();
        }
    }

    render() {
        let html = '';
        this.#items.forEach((item, index) => {
            let checked = item.checked ? 'checked' : '';
            html += `<li data-index="${index}">
                     <input type="checkbox" ${checked}>
                     <span>${item.text}</span>
                     </li>`
        })

        this.#el.innerHTML = html;

    }

    async init() {
        this.#items = await this.read();   // 上面的read是非同步狀態，所以在這裡的init功能也必須用async await
        this.render();
        this.#el.addEventListener('click', (e) => {
            let el = e.target;
            let tag = el.tagName.toString().toUpperCase();

            if (tag == 'SPAN' || tag == 'INPUT') {
                el = el.parentNode;
            }

            if (el.tagName.toString().toUpperCase() == 'LI') {
                let index = el.dataset.index;
                this.checkedToggle(index);
            }
        })
    }
}

export { TODO };