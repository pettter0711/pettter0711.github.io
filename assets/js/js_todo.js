let elInput = document.querySelector('#todo-in');
let elBtn = document.querySelector('#todo-add-btn');
let elItem = document.querySelector('.todo-item');

const addTodo = () => {
    let value = elInput.value;
    if (!value) {
        elInput.focus();
        return
    }

    elItem.innerHTML += `<li>
                        <input type="checkbox">
                        <span>${value}</span>
                        </li>`

    elInput.value = '';
    elInput.focus();
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
    let isChecked = false;

    if (tag == 'INPUT') {
        isChecked = true;
    }

    if (tag == 'SPAN' || tag == 'INPUT') {
        el = el.parentNode;
        console.log(el)
    }

    if (el.tagName.toString().toUpperCase() == 'LI') {
        let checkbox = el.querySelector('input[type="checkbox"]');
        if (!isChecked) {
            checkbox.checked = !checkbox.checked;
        }
    }

})