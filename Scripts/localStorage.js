export class LocalStorage {
    static getData(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }
 
    static setData(key, data) {   
        localStorage.setItem(key, JSON.stringify(data));
    }
}

