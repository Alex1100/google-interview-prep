/**
 * Initialize your data structure here.
 */

class TimeMap {
    constructor() {
        this.itemsMap = new Map();
    }

    set(key, val, timestamp) {
        if (!this.itemsMap.has(key)) this.itemsMap.set(key, []);
        this.itemsMap.get(key)[timestamp] = val;
    }

    get(key, timestamp) {
        if (!this.itemsMap.has(key)) return '';
        const item = this.itemsMap.get(key);
        if (item[timestamp]) return item[timestamp];
        while (timestamp-- > -1) {
            if (item[timestamp]) return item[timestamp];
        }
        return '';
    }
}

/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */
