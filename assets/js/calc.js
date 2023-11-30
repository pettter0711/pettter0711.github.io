let num1 = document.querySelector('#calc-num-1');
let num2 = document.querySelector('#calc-num-2');
let method = document.querySelector('#method');
let btn = document.querySelector('#calc-btn');
let result = document.querySelector('#result');

console.log(num1, num2, method, btn, result);


btn.addEventListener('click', (e) => {
    let n1 = +num1.value;
    let n2 = +num2.value;
    let me = method.value;

    if (isNaN(n1) || isNaN(n2) || !me) {
        return;
    }

    let symbol = '';
    let total = 0;

    if (me == 'add') {
        total = n1 + n2;
        symbol = '+';
    }

    if (me == 'sub') {
        total = n1 - n2;
        symbol = '-';
    }

    if (me == 'mul') {
        total = n1 * n2;
        symbol = 'x';
    }

    if (me == 'div') {
        total = n1 / n2;
        symbol = '/';
    }

    result.innerHTML = `${n1} ${symbol} ${n2} = ${total}`;
})