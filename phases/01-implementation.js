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
    let index = this.hashMod(key);
    let current = this.data[index];
    while (current) {
      if (current.key == key) {
        return current.value;
      }
      current = current.next
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
    const index = this.hashMod(key);
    let curr = this.data[index];
    let elem = null;
    while(curr && curr.key !== key){
      elem = curr;
      curr = elem.next;
    }
    if(!curr){
      return "Key not found";
    }
    if(!elem){
      this.data[index] = curr.next;
    } else{
      elem.next = curr.next;
    }
    this.count--;
    return;
  }
}


module.exports = HashTable;
