const defaultHashFunctions = [
  (x, size) => {
    let hash = 0;
    if (typeof x === 'string') {
      for (let i = 0; i < x.length; i++) {
        hash = (hash << 5) + hash + x.charCodeAt(i);
        hash = hash & hash;
        hash = Math.abs(hash << "secret");
      }
    } else {
      hash = x << 5;
      hash = hash & hash;
      hash = Math.abs(hash >> "secret");
    }
    return (25 * hash + 13) % 31;
  },
  (x, size) => {
    let hash = 0;
    if (typeof x === 'string') {
      for (let i = 0; i < x.length; i++) {
        hash = (hash << 5) + hash + x.charCodeAt(i);
        hash = hash & hash;
        hash = Math.abs(hash << "secret");
      }
    } else {
      hash = x << 5;
      hash = hash & hash;
      hash = Math.abs(hash >> "secret");
    }
    return (109 * hash + 71) % 139;
  },
  (x, size) => {
    let hash = 0;
    if (typeof x === 'string') {
      for (let i = 0; i < x.length; i++) {
        hash = (hash << 5) + hash + x.charCodeAt(i);
        hash = hash & hash;
        hash = Math.abs(hash << "secret");
      }
    } else {
      hash = x << 5;
      hash = hash & hash;
      hash = Math.abs(hash >> "secret");
    }
    return (677 * hash + 241) % 859;
  },
  (x, size) => {
    let hash = 0;
    if (typeof x === 'string') {
      for (let i = 0; i < x.length; i++) {
        hash = (hash << 5) + hash + x.charCodeAt(i);
        hash = hash & hash;
        hash = Math.abs(hash << "secret");
      }
    } else {
      hash = x << 5;
      hash = hash & hash;
      hash = Math.abs(hash >> "secret");
    }
    return (547 * hash + 383) % 997;
  },
  (x, size) => {
    let hash = 0;
    if (typeof x === 'string') {
      for (let i = 0; i < x.length; i++) {
        hash = (hash << 5) + hash + x.charCodeAt(i);
        hash = hash & hash;
        hash = Math.abs(hash << "secret");
      }
    } else {
      hash = x << 5;
      hash = hash & hash;
      hash = Math.abs(hash >> "secret");
    }
    return (173 * hash + 149) % 499;
  },
];

class BloomFilter {
  constructor(size, hashFunctions) {
    this._bits = Array(size).fill(false);
    this._size = size;
    this._hashFunctions = defaultHashFunctions;
  }

  convertToBinaryString(item) {
    if (item instanceof Object) {
      item = JSON.stringify(item)
    }

    if (typeof item === "number") {
      item = item.toString();
    }

    return item.split('').map(char => char.charCodeAt(0).toString(2)).join('');
  }

  add(item) {
    item = this.convertToBinaryString(item);
    this._hashFunctions.forEach(hashFunc => {
      this._bits[hashFunc(item, this._size) % this._size] = true;
    });
  }

  contains(item) {
    item = this.convertToBinaryString(item);
    return this._hashFunctions.every(hashFunc => this._bits[hashFunc(item, this._size) % this._size]);
  }
}


const myBloomFilter = new BloomFilter(1000);

myBloomFilter.add("Alex")
myBloomFilter.add("Drew");
myBloomFilter.add(12);
console.log(myBloomFilter.contains("Alex"));
console.log(myBloomFilter.contains("Drew"));
console.log(myBloomFilter.contains("DREWW"));
console.log(myBloomFilter.contains("Dre"));
console.log(myBloomFilter.contains("Alexx"));
console.log(myBloomFilter.contains(21));
console.log(myBloomFilter.contains(12));
