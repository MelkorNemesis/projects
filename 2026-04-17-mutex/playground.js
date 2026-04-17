import util from 'util';

class Mutex {
  #mutex = Promise.resolve();

  lock() {
    return new Promise((resolve) => {
                                                    // (res) => resolve(res)
      this.#mutex = this.#mutex.then(() => new Promise(resolve));
    });
  }
}

const mutex = new Mutex();
const unlock = await mutex.lock();
unlock();
