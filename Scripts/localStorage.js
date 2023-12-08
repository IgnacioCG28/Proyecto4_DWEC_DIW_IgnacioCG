export class LocalStorage {
    static getData(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }
 
    static setData(key, data) {   
        localStorage.setItem(key, JSON.stringify(data));
    }

    static removeData(key) {
        localStorage.removeItem(key);
    }

    static clearData() {
        localStorage.clear();
    }

    static checkData(key) {
        return localStorage.getItem(key) !== null;
    }

    static checkDataLength(key) {
        return localStorage.getItem(key).length;
    }

}

