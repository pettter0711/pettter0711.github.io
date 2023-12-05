let score = document.querySelector('#score');
let btn = document.querySelector('.btn');
let result = document.querySelector('.result');

console.log(score, btn, result)

btn.addEventListener('click', (e) => {

    let nn = +score.value
    let ref = '不及格';

    if (isNaN(nn) || nn > 100) {
        alert('請確認分數為數字，且不得大於100!')
        return;
    }

    // if (nn >= 90) {
    //     ref = '甲';
    // }

    // if (nn >= 80 && nn < 90) {
    //     ref = '乙';
    // }

    // if (nn >= 70 && nn < 80) {
    //     ref = '丙';
    // }

    // if (nn >= 60 && nn < 70) {
    //     ref = '丁';
    // }

    if (nn >= 60) {
        ref = '丁';
    }

    if (nn >= 70) {
        ref = '丙';
    }

    if (nn >= 80) {
        ref = '乙';
    }

    if (nn >= 90) {
        ref = '甲';
    }

    result.innerHTML = `這位同學的分數是 ${nn}，等級為 ${ref}`;

})

score.addEventListener('keyup', (e) => {
    if (e.key == 'Enter') {
        btn.click();
    }
})