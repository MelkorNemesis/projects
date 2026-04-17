import { Mutex } from './mutex.js';

// A simple example of using the mutex to synchronize access to a shared resource
const main = async () => {
  const mutex = new Mutex();
  let counter = 0;
  
  async function increment() {
    await mutex.lock();
  
    // critical section
    const temp = counter;
    await new Promise(r => setTimeout(r, 1000)); // simulate async work that takes 1 second
    counter = temp + 1;
    // end critical section
  
    mutex.unlock();
  }
  
  // Without the mutex, the Promise.all would resolve after about ~1 second
  // With the mutex, the Promise.all resolves after about ~3 seconds
  await Promise.all([
    increment(),
    increment(),
    increment()
  ]);

  // Without the mutex, the counter would be 1
  // With the mutex, the counter is 3
  console.log(counter);
};

main();

