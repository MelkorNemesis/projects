const buffer16 = new ArrayBuffer(16); // 16 bytes
console.dir(buffer16);

const int32view = new Int32Array(buffer16);
const uint16view = new Uint16Array(buffer16);

int32view[0] = 65536;
console.dir(int32view);
console.dir(uint16view);
console.dir(buffer16);