import path from 'node:path';
import { fileURLToPath } from 'node:url';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROTO_PATH = path.join(__dirname, 'greeter.proto');
const PORT = '0.0.0.0:50051';

// Load and parse the .proto file at runtime – no code-gen step needed.
const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const { greeter } = grpc.loadPackageDefinition(packageDef);

// ── RPC implementations ──────────────────────────────────────────────────────

// Unary: client sends one request, server replies once and closes the stream.
function sayHello(call, callback) {
  const { name } = call.request;
  console.log(`[server] SayHello called with name="${name}"`);
  callback(null, { message: `Hello, ${name}!` });
}

// Server-streaming: client sends one request, server replies N times.
function sayHelloStream(call) {
  const { name } = call.request;
  console.log(`[server] SayHelloStream called with name="${name}"`);

  const greetings = ['Hello', 'Hi', 'Hey', 'Greetings', 'Howdy'];
  let i = 0;

  const interval = setInterval(() => {
    call.write({ message: `${greetings[i]}, ${name}!` });
    i++;
    if (i >= greetings.length) {
      clearInterval(interval);
      call.end(); // signals no more messages
    }
  }, 300);
}

// ── Server setup ─────────────────────────────────────────────────────────────

const server = new grpc.Server();

server.addService(greeter.Greeter.service, { sayHello, sayHelloStream });

server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) throw err;
  console.log(`[server] Listening on port ${port}`);
});
