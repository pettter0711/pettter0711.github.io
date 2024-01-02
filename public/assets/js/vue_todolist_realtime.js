import { App } from "../../js_todo_realtime/assets/js/firebase/APP.js";
import { Auth } from "../../js_todo_realtime/assets/js/firebase/Auth.js"
import { Database } from "../../js_todo_realtime/assets/js/firebase/Database.js";

const app = await App.init();
const auth = new Auth(app);
const database = new Database(app);

Vue.createApp({
    data() {
        return {
            isAuth: false,
            auth: {
                account: '',
                secret: '',
            },
            todo: {
                text: '',
            },
            items: [],
            user: {},  //初始化變數user為一個物件，在後面的程式碼，會賦予其user的值。
            // firebase: {
            //     auth: '',
            //     database: '',
            // },
        }
    },
    methods: {

        initAuth() {
            this.auth.account = '';
            this.auth.secret = '';
        },

        async login() {
            console.log(this.$refs);

            let account = this.auth.account;  //類似class的實例化，利用變數宣告auth物件的值，
            let password = this.auth.secret;  //使以下的程式碼中可直接用變數。

            if (!account) {
                await Swal.fire({
                    title: '登入失敗',
                    html: '帳號錯誤',
                    icon: 'error'
                })
                setTimeout(() => {
                    this.$refs.auth_account.focus();
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
                    this.$refs.auth_secret.focus();
                }, 500)
                return
            }

            let user = await auth.signIn(account, password);
            if (user) {
                await Swal.fire({
                    title: '登入成功',
                    html: `登入帳號為${account}`,
                    icon: 'success'
                })
                console.log(user);

                this.initAuth();
            } else {
                await Swal.fire({
                    title: '登入失敗',
                    html: `帳號密碼錯誤`,
                    icon: 'error'
                })
            }
        },

        async logout() {
            await auth.signOut();
            await Swal.fire({  //這裡加上swal.fire，提醒使用者已登出。搭配await，讓最後的isAuth會晚一點切換。
                title: '登出成功',
                html: `您已登出`,
                icon: 'success'
            })
        },

        async register() {

            let account = this.auth.account;
            let password = this.auth.secret;

            if (!account) {
                await Swal.fire({
                    title: '註冊失敗',
                    html: '帳號未填寫',
                    icon: 'error'
                })
                setTimeout(() => {
                    this.$refs.auth_account.focus();
                }, 500)
                return
            }

            if (!password) {
                await Swal.fire({
                    title: '註冊失敗',
                    html: '密碼未填寫',
                    icon: 'error'
                })
                setTimeout(() => {
                    this.$refs.auth_secret.focus();
                }, 500)
                return
            }

            let user = await auth.register(account, password);
            if (user) {
                await Swal.fire({
                    title: '註冊成功',
                    html: '請登入',
                    icon: 'success'
                })

                await auth.signOut();  //註冊完成後，會執行下方的authed。為避免這種情形，在此加上auth.signOut()。
                this.initAuth();
            } else {
                Swal.fire({
                    title: '註冊失敗',
                    html: `請重新輸入`,
                    icon: 'error'
                })
            }
        },

        authed(user) {
            console.log('authed');
            this.isAuth = true;  //切換v-show的顯示頁面
            this.user = user;  //賦予data裡初始化的user，user的值
            db.listen(this.savePath(), (data) => {
                this.items = data
            })
        },

        unauthed() {
            console.log('unauthed');
            this.user = {};  //清空(初始化)賦予data裡初始化的user。
            this.isAuth = false;  //切換v-show的顯示頁面
        },

        add() {
            let value = this.todo.text;


            if (value) {
                return; // void
            }

            elInput.value = '';
            this.$refs.todo_text.focus();

            todo.add(value);
        },
        savePath() {
            return `todo/${this.user.uid}`
        }
    },
    async mounted() {
        // const app = await App.init();
        // this.firebase.auth = new Auth(app);
        // this.firebase.database = new Database(app);
        auth.onChange(this.authed, this.unauthed);  //頁面重新整理時會先執行此項，判斷是否有user登入，再去做上方相應的function。
        console.log('todo app is mounted!');
    }
}).mount('#todo-app')