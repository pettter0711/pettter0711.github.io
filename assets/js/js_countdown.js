
const initEnd = () => {
    let end = new Date;
    end.setFullYear(2024);
    end.setMonth(0);
    end.setDate(1);
    end.setSeconds(0);
    end.setMinutes(0);
    end.setSeconds(0);
    console.log(end);
    return end;
}

const updateHTML = (days, hours, minutes, seconds) => {
    let countDays = document.querySelector('#countdown-days');
    let countHours = document.querySelector('#countdown-hours');
    let countMinutes = document.querySelector('#countdown-minutes');
    let countSeconds = document.querySelector('#countdown-seconds');

    countDays.innerHTML = (days);
    countHours.innerHTML = (hours);
    countMinutes.innerHTML = (minutes);
    countSeconds.innerHTML = (seconds);
}

const calc = (end) => {
    let current = new Date().getTime();
    let diff = (end - current) / 1000;  // 截止時間減掉現在時間後，要除以1000，因為電腦內時間以毫秒(千分之秒)計算

    let units = {  // 設定時間單位
        days: 60 * 60 * 24,
        hours: 60 * 60,
        minutes: 60
    };

    // 設定時間的變數天時分秒，每個變數為"截止時間 減 現在時間 除以 時間單位，且四捨五入(Math.floor)。
    // 時以"天除完時間單位後的餘數"再除以時間單位。分秒依此類推。
    let days = Math.floor(diff / units.days);

    diff = diff % units.days;
    let hours = Math.floor(diff / units.hours);

    diff = diff % units.hours;
    let minutes = Math.floor(diff / units.minutes);

    let seconds = Math.floor(diff % units.minutes);

    // hours = hours.toString().padStart(2, '0');
    // minutes = minutes.toString().padStart(2, '0');
    // seconds = seconds.toString().padStart(2, '0');

    if (hours < 10) {
        hours = '0' + hours;
    }

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    updateHTML(days, hours, minutes, seconds);
}

let end = initEnd()
calc(end); //先跑一次到計時，不然呈現會lag。

setInterval(() => {
    calc(end)
}, 1000)


let n1 = 5;
let n2 = 3;
let nn = +n1 % +n2;
console.log(nn);
