let elNameInput = document.querySelector('#name');
let elIntroInput = document.querySelector('#intro');
let elPeriodInput = document.querySelector('#period')
let elMemberInput = document.querySelector('#member');
let addMemberBtn = document.querySelector('.add-member-btn');
let elMemberList = document.querySelector('.member-list');
let memberItems = [];

let elInfoName = document.querySelector('.info-name .info-content');
let elInfoPeriod = document.querySelector('.info-period .info-content');
let elTimeInput = document.querySelector('#arrange-time');
let elContentInput = document.querySelector('#arrange-content');
let addArrangeBtn = document.querySelector('.add-arrange-btn');
let elArrangeList = document.querySelector('.arrange-list');
let arrangeItems = [];

let elResultName = document.querySelector('.result-name .content');
let elResultIntro = document.querySelector('.result-intro .content');
let elResultPeriod = document.querySelector('.result-period .content');
let elResultMember = document.querySelector('.result-member .result-member-list');
let elResultArrange = document.querySelector('.result-arrange .result-arrange-list');

const poka = async (member, time, arrange, periodValue, memberLi, arrangeLi) => {
    let currentTabId = document.querySelector('.tabs.active').id;

    if (currentTabId == 'p-1') {  //當tabs在p-1時啟動
        if (!member) {  //新增成員防呆
            await Swal.fire({
                title: '沒有成員!',
                html: '請輸入成員',
                icon: 'error'
            })
            setTimeout(() => {
                elMemberInput.focus();
            }, 400)
            return
        }
        if (!periodValue || !memberLi) {  //下一步防呆
            Swal.fire({
                title: '資料不齊全!',
                html: '請輸入日期、成員',
                icon: 'error'
            })
            return
        }
    }

    if (currentTabId == 'p-2') {  //當tabs在p-2時啟動
        if (!time || !arrange) {  //新增行程防呆
            await Swal.fire({
                title: '沒有時間、行程內容!',
                html: '請輸入時間、行程內容',
                icon: 'error'
            })
            setTimeout(() => {
                elTimeInput.focus()
            }, 400)
            return
        }
        if (!arrangeLi) {  //下一步防呆
            Swal.fire({
                title: '資料不齊全!',
                html: '請新增行程時間及內容',
                icon: 'error'
            })
            return
        }
    }
}

// 新增成員
addMemberBtn.addEventListener('click', async (e) => {
    let member = elMemberInput.value;
    if (!member) {
        poka(member)
        return
    }

    memberItems.push(member);

    let html = '';
    let resultHtml = '';
    memberItems.forEach((member, index) => {
        html += `<li class="member-item" data-index="${index}">
                   <div class="member-block">${member}</div>
                   <button class="delete-btn">
                      <span class="material-symbols-outlined">close</span>
                   </button>
                 </li>`
        resultHtml += `<li class="result-member-item" data-index="${index}">
                         <div>${member}</div>
                       </li>`
    })
    console.log(memberItems);

    elMemberList.innerHTML = html;
    elResultMember.innerHTML = resultHtml;

    elMemberInput.value = '';
    elMemberInput.focus();
})
// 新增成員
elMemberInput.addEventListener('keyup', async (e) => {
    let member = elMemberInput.value;
    let key = e.key.toString().toUpperCase();
    if (key == 'ENTER') {
        if (!member) {
            poka(member)
            return
        }
        addMemberBtn.click();
    }
})
// 成員刪除
elMemberList.addEventListener('click', (e) => {
    let el = e.target;
    let li = '';
    let eTag = el.tagName.toString().toUpperCase();
    if (eTag == 'SPAN' || eTag == 'BUTTON') {
        el = el.parentNode;
        li = el.parentNode;
        console.log(li.tagName)

        if (li.tagName.toString().toUpperCase() == 'LI') {
            let index = li.dataset.index;
            memberItems.splice(index, 1);
            console.log(memberItems);

            let html = '';
            let resultHtml = '';
            memberItems.forEach((member, index) => {
                html += `<li class="member-item" data-index="${index}">
                           <div class="member-block">${member}</div>
                           <button class="delete-btn">
                              <span class="material-symbols-outlined">close</span>
                           </button>
                         </li>`
                resultHtml += `<li class="result-member-item" data-index="${index}">
                                 <div>${member}</div>
                               </li>`
            })

            elMemberList.innerHTML = html;
            elResultMember.innerHTML = resultHtml;

            elMemberInput.value = '';
            elMemberInput.focus();
        }
    }
})

// 新增行程
addArrangeBtn.addEventListener('click', async (e) => {
    let time = elTimeInput.value;
    let arrange = elContentInput.value;

    if (!time || !arrange) {
        poka(time, arrange)
        return
    }

    arrangeItems.push({ 'time': time, 'arrange': arrange });
    console.log(arrangeItems);

    let html = '';
    let elResultHtml = '';
    arrangeItems.forEach((arrangeItem, index) => {
        html += `<li class="arrange-item" data-index="${index}">
                 <div class="arrange-list-time">${arrangeItem.time}</div>
                 <div class="arrange-list-content">${arrangeItem.arrange}</div>
                 <button class="delete-btn">
                 <span class="material-symbols-outlined">close</span>
                 </button>
                 </li>`
        elResultHtml += `<li class="result-arrange-item" data-index="${index}">
                         <div class="arrange-list-time">${arrangeItem.time}</div>
                         <div class="arrange-list-content">${arrangeItem.arrange}</div>
                         </li>`
    })

    elArrangeList.innerHTML = html;
    elResultArrange.innerHTML = elResultHtml;

    elTimeInput.value = '';
    elContentInput.value = '';
    elTimeInput.focus()
})
// 新增行程
elContentInput.addEventListener('keyup', async (e) => {
    let time = elTimeInput.value;
    let arrange = elContentInput.value;

    let key = e.key.toString().toUpperCase();
    if (key == 'ENTER') {
        if (!time || !arrange) {
            poka(time, arrange)
            return
        }
        addArrangeBtn.click()
    }
})
// 行程刪除
elArrangeList.addEventListener('click', (e) => {
    let el = e.target;
    let eTag = el.tagName.toString().toUpperCase();
    let li = '';

    if (eTag == 'SPAN' || eTag == 'BUTTON') {
        el = el.parentNode;
        li = el.parentNode;

        if (li.tagName.toString().toUpperCase() == 'LI') {
            let index = li.dataset.index;
            arrangeItems.splice(index, 1);
            console.log(arrangeItems);

            let html = '';
            let elResultHtml = '';
            arrangeItems.forEach((arrangeItem, index) => {
                html += `<li class="arrange-item" data-index="${index}">
                         <div class="arrange-list-time">${arrangeItem.time}</div>
                         <div class="arrange-list-content">${arrangeItem.arrange}</div>
                         <button class="delete-btn">
                         <span class="material-symbols-outlined">close</span>
                         </button>
                         </li>`
                elResultHtml += `<li class="result-arrange-item" data-index="${index}">
                                 <div class="arrange-list-time">${arrangeItem.time}</div>
                                 <div class="arrange-list-content">${arrangeItem.arrange}</div>
                                 </li>`
            })

            elArrangeList.innerHTML = html;
            elResultArrange.innerHTML = elResultHtml;

            elTimeInput.value = '';
            elContentInput.value = '';
            elTimeInput.focus()
        }
    }
})

// 頁面切換
document.addEventListener('DOMContentLoaded', (e) => {
    // 下一步按鈕
    let nextPageBtn = document.querySelectorAll('.next-btn');
    nextPageBtn.forEach((button) => {
        button.addEventListener('click', (e) => {
            let currentTabId = document.querySelector('.tabs.active').id;

            if (currentTabId == 'p-1') {  // 防呆: 當tabs在p-1時啟動
                let periodValue = elPeriodInput.value;
                let memberLi = elMemberList.querySelector('li');
                let member = true;

                if (!periodValue || !memberLi) {
                    poka(member, null, null, periodValue, memberLi, null);
                    return
                }
            }
            if (currentTabId == 'p-2') {  // 防呆: 當tabs在p-2時啟動
                let arrangeLi = elArrangeList.querySelector('li');
                let time = true;
                let arrange = true;

                if (!arrangeLi) {
                    poka(null, time, arrange, null, null, arrangeLi);
                    return
                }
            }

            // 資料導入最後一頁
            if (!elNameInput.value) {
                elNameInput.value = '我的旅遊行程';
            }
            if (!elIntroInput.value) {
                elIntroInput.value = '我的旅遊行程'
            }
            elInfoName.innerHTML = elNameInput.value;
            elInfoPeriod.innerHTML = elPeriodInput.value;

            elResultName.innerHTML = elNameInput.value;
            elResultIntro.innerHTML = elIntroInput.value;
            elResultPeriod.innerHTML = elPeriodInput.value;

            let nextTabId = getNextTabId(currentTabId);
            showTab(nextTabId);
        })
    })

    // 上一步按鈕
    let PrePageBtn = document.querySelectorAll('.pre-btn');
    PrePageBtn.forEach((button) => {
        button.addEventListener('click', (e) => {
            let currentTabId = document.querySelector('.tabs.active').id;
            let preTabId = getPreTabId(currentTabId);
            showTab(preTabId);
        })
    })

    // 顯示有active的tabs
    const showTab = (tabId) => {
        let elPage = document.querySelectorAll('.tabs');
        elPage.forEach((tab) => {
            tab.classList.remove('active');
        })
        let elTab = document.querySelector(`#${tabId}`);
        elTab.classList.add('active');
    }

    // 取得下一個tab的id
    const getNextTabId = (currentTabId) => {
        let currentTabNumber = parseInt(currentTabId.split('-')[1]);
        let nextTabNumber = currentTabNumber + 1;
        return 'p-' + nextTabNumber;
    }

    // 取得上一個tab的id
    const getPreTabId = (currentTabId) => {
        let currentTabNumber = parseInt(currentTabId.split('-')[1]);
        let prevTabNumber = currentTabNumber - 1;
        return 'p-' + prevTabNumber;
    }

    showTab('p-1');
})

//刪除整個行程
let cancelAllBtn = document.querySelector('.cancel-btn');
cancelAllBtn.addEventListener('click', async (e) => {
    await Swal.fire({
        title: "確定刪除行程?",
        text: "刪除後動作無法復原!",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "確定刪除"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "刪除完成!",
                text: "您的行程已刪除",
                icon: "success"
            });

            setTimeout(() => {
                location.reload();
            }, 1200)
        }
    });
})

//贊助
let sponsorBtn = document.querySelector('#sponsor');
// sponsorBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     Swal.fire({
//         title: "感謝您的支持!",
//         text: "您的支持是開發者繼續努力的動力!",
//         imageUrl: "images/sponsor-qrcode.png",
//         imageWidth: 400,
//         imageHeight: 200,
//         imageAlt: "贊助 QR Code"
//     });
// })

sponsorBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openPopup();
})

let closeSponsorBtn = document.querySelector('.close-popup-btn');
closeSponsorBtn.addEventListener('click', (e) => {
    closePopup();
})

const openPopup = () => {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("popup-container").style.display = "block";
}

const closePopup = () => {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("popup-container").style.display = "none";
}


//功能待開發通知 
const inProcess = () => {
    let returnBtn = document.querySelector('.return-btn');
    returnBtn.addEventListener('click', (e) => {
        Swal.fire({
            title: '此功能開發中',
            html: '謝謝您的支持~',
            icon: 'warning'
        })
        return
    })

    let menuList = document.querySelector('.header-menu');
    menuList.addEventListener('click', (e) => {
        e.preventDefault();

        let el = e.target;
        let eTag = el.tagName.toString().toUpperCase();
        let li = ''

        if (eTag == 'A' || eTag == 'SPAN') {
            el = el.parentNode;
            li = el.parentNode;
        }

        if (li.tagName.toString().toUpperCase() == 'LI') {
            Swal.fire({
                title: '此功能開發中',
                html: '謝謝您的支持~',
                icon: 'warning'
            })
            return
        }
    })

    let confirmBtn = document.querySelector('.confirm-btn');
    confirmBtn.addEventListener('click', (e) => {
        Swal.fire({
            title: '更多功能開發中',
            html: '謝謝您的撥空體驗~',
            icon: 'warning'
        })
        return
    })
}
inProcess();

