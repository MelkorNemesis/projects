class Mutex {
  #queue = [];
  #locked = false;

  lock() {
    if (!this.#locked) {
      this.#locked = true;
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      this.#queue.push(resolve);
    });
  }

  unlock() {
    const resolve = this.#queue.shift();
    if (resolve) {
      resolve();
    } else {
      this.#locked = false;
    }
  }
}

export { Mutex }
