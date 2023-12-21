import { App } from "../firebase/APP.js";
import { Database } from "../firebase/Database.js";

class TodoRealtime {
    #items
    #el
    #uid
    #database

    constructor(el, uid = 'todo') {
        this.#items = [];
        this.#el = el;
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
        this.#database.write(this.#savePath(), this.#items);
        // await TODO_API.update(this.#uid, this.#items);
    }

    async read() {
        // return await TODO_API.get(this.#uid);
        // TODO_API.get 是非同步狀態，所以在這裡的read功能也必須用async await
    }

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

    #savePath() {  // 這是一個method
        return `todo/${this.#uid}`
    }

    async init() {
        const app = await App.init();
        this.#database = new Database(app);

        this.#database.listen(this.#savePath(), (data) => {

            // 寫法1
            // if (!data) {
            //     this.#items = [];
            // } else {
            //     this.#items = data;
            // }

            // 寫法2
            // if (!data) {
            //     this.#items = [];
            // }
            // this.#items = data

            this.#items = data || []; //寫法3(等於寫法1or2)
            this.render();
        })

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

export { TodoRealtime };