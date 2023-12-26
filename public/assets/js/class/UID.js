class UID {
    static #key = 'todo_uid';
    // 使用static時，其性質靜態。當其他js在使用這個class時，不用先寫"let xxx = new UID();"，即可直接使用。
    // 但是static會使透過此class產生的資料，被其他同樣使用該功能的人覆寫。

    static read() {
        return localStorage.getItem(this.#key);
    }

    static write(uid) {
        return localStorage.setItem(this.#key, uid);
    }

    static clear() {
        return localStorage.removeItem(this.#key);
    }
}

export { UID };