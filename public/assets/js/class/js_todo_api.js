class TODO_API {
    static async update(uid, data = []) {
        let api = "https://book.niceinfos.com/frontend/api/";
        let params = {
            action: 'todo',
            uid: uid,
            data: data
        }

        let options = {
            method: 'POST',
            body: JSON.stringify(params)
        }

        let response = await fetch(api, options);
        let json = await response.json();
        return json.data;
    }

    static async get(uid) {
        let api = `https://book.niceinfos.com/frontend/api/?action=todo&uid=${uid}`
        let response = await fetch(api);
        let json = await response.json(); //一般大家做的api都會使用json格式，所以這裡抓取api時可直接抓json()。
        return json.data;


        // 如果擔心對方api不是json，直接用try - catch方式，讓噴錯直接在這邊解除。
        // let text = await resonse.text();
        // try{
        //     return json.parse(text);
        // } catch(e){
        //     return {}
        // }
    }
    // fetch是非同步傳輸，注意使用async及await的搭配來跑功能。




}

export { TODO_API };