class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    // Initialize your buckets here
    // Your code here
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null)
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {

    if (this.count + 1 > this.capacity) {
      this.resize()
    }

    const index = this.hashMod(key);

    let currentPair = this.data[index];

    while (currentPair && currentPair.key !== key) {
      currentPair = currentPair.next;
    }

    if (currentPair) {
      currentPair.value = value;
      return this;
    }

    const newPair = new KeyValuePair(key, value);

    if (this.data[index]) newPair.next = this.data[index];
    this.data[index] = newPair;
    this.count++;


  }


  read(key) {

    // for(let i = 0; i < this.data.length; i++) {
    //   let ele = this.data[i];
    //   if(ele === null) break;
    //   if(ele.key === key) return ele.value;
    // }
    let index = this.hashMod(key)

    let current = this.data[index]
    if (current.key === key) {
      return current.value
    } else {
      while (current) {
        if (current.key === key) {
          return current.value
        }
        current = current.next
      }
    }

  }


  resize() {
    let newData = new Array(this.capacity * 2).fill(null)
    this.capacity *= 2;
    this.count = 0
    const oldData = this.data
    this.data = newData;
    for (let i = 0; i < oldData.length; i++) {
      // this.insert(oldData[i].key, oldData[i].value)
      let current = oldData[i]
      while(current){
        this.insert(current.key, current.value);
        current = current.next
      }
    }
  }


  delete(key) {
    // Your code here
    let index = this.hashMod(key)

    let current = this.data[index]
    let prev;
    if(!current) return "Key not found"
    if (current.key === key) {
      this.data[index] = current.next
      this.count--
    } else {
      while (current.key !== key) {
      if(current.next === null) return "Key not found"
        prev = current
        current = current.next
      }
    }
    if(!current.next) {
      current = null
      this.count--
    } else {
      prev.next = current.next
      current = null;
      this.count-- 
    }
  }
}


module.exports = HashTable;
