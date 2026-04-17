// A simple mutex implementation in JavaScript
class Mutex {
  constructor() {
    this.locked = false;
    this.waiting = [];
  }

  async lock() {
    if (!this.locked) {
      this.locked = true;
      return;
    }

    return new Promise(resolve => {
      this.waiting.push(resolve);
    });
  }

  unlock() {
    if (this.waiting.length > 0) {
      const next = this.waiting.shift();
      next();
    } else {
      this.locked = false;
    }
  }
}

export { Mutex };