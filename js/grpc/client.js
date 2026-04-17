import path from 'node:path';
import { fileURLToPath } from 'node:url';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROTO_PATH = path.join(__dirname, 'greeter.proto');
const SERVER_ADDR = 'localhost:50051';

const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const { greeter } = grpc.loadPackageDefinition(packageDef);

// Create a stub – this is the client-side handle to the remote service.
const client = new greeter.Greeter(SERVER_ADDR, grpc.credentials.createInsecure());

// ── 1. Unary call ────────────────────────────────────────────────────────────
// Works like a regular async function: send one request, await one response.

function callSayHello(name) {
  return new Promise((resolve, reject) => {
    client.sayHello({ name }, (err, response) => {
      if (err) return reject(err);
      resolve(response);
    });
  });
}

// ── 2. Server-streaming call ─────────────────────────────────────────────────
// The server pushes multiple messages back over a single connection.

function callSayHelloStream(name) {
  return new Promise((resolve, reject) => {
    const call = client.sayHelloStream({ name });

    call.on('data', (response) => {
      console.log(`[client] stream received: "${response.message}"`);
    });

    call.on('end', () => {
      console.log('[client] stream ended');
      resolve();
    });

    call.on('error', reject);
  });
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('── Unary call ──────────────────────────────');
  const reply = await callSayHello('World');
  console.log(`[client] received: "${reply.message}"`);

  console.log('\n── Server-streaming call ───────────────────');
  await callSayHelloStream('World');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
