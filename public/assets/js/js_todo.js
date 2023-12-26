let elInput = document.querySelector('#todo-in');
let elBtn = document.querySelector('#todo-add-btn');
let elItem = document.querySelector('.todo-item');

let items = []; //宣告變數items為一個陣列。

/**
 * 將 items 資料使用迴圈組成 HTML 並顯示。
 */

const render = () => {
    let html = '';
    items.forEach((item, index) => {
        let checked = item.checked ? 'checked' : '';  //三元判斷式
        html += `<li data-index="${index}">
                 <input type="checkbox" ${checked}>
                 <span>${item.text}</span>
                 </li>` //data-index讓li物件加上索引
    })

    elItem.innerHTML = html;
}

const addTodo = () => {
    let value = elInput.value;
    if (!value) {
        elInput.focus();
        return
    }

    elInput.value = '';
    elInput.focus();

    items.push({ checked: false, text: value });
    render();
}

elBtn.addEventListener('click', (e) => {
    addTodo();
})

elInput.addEventListener('keyup', (e) => {
    if (e.key.toString().toUpperCase() == 'ENTER') {
        addTodo();
    }
})

elItem.addEventListener('click', (e) => {
    let el = e.target;
    let tag = el.tagName.toString().toUpperCase();
    // let isChecked = false;

    // if (tag == 'INPUT') {
    //     isChecked = true;
    // }

    if (tag == 'SPAN' || tag == 'INPUT') {
        el = el.parentNode;
    }

    if (el.tagName.toString().toUpperCase() == 'LI') {
        // let checkbox = el.querySelector('input[type="checkbox"]');
        // if (!isChecked) {
        //     checkbox.checked = !checkbox.checked;
        // }

        let index = el.dataset.index;
        items[index].checked = !items[index].checked;
        render();
    }

})