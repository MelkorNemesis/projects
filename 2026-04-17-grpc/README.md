# gRPC Demo

A minimal Node.js demo showing how gRPC works.

## What is gRPC?

gRPC is a high-performance remote procedure call (RPC) framework. Instead of
REST (where you call URLs), you call **functions** on a remote server as if
they were local. Under the hood it uses:

- **Protocol Buffers** (`.proto`) to define the service contract in a
  language-neutral way
- **HTTP/2** as the transport (multiplexed, binary framing)
- **Strongly-typed** generated stubs on both client and server

## Project structure

```
greeter.proto   ← service contract (the "API schema")
server.js       ← implements the service
client.js       ← consumes the service
```

## The service contract (`greeter.proto`)

```proto
service Greeter {
  rpc SayHello (HelloRequest) returns (HelloReply);           // unary
  rpc SayHelloStream (HelloRequest) returns (stream HelloReply); // server-streaming
}
```

Two RPC styles are demonstrated:

| Style | Request | Response | Use case |
|---|---|---|---|
| **Unary** | 1 | 1 | Typical request/response, like REST |
| **Server-streaming** | 1 | many | Server pushes data back (logs, feeds, progress) |

## Running it

Open **two terminals** in this directory.

**Terminal 1 – start the server:**
```bash
npm run server
```

**Terminal 2 – run the client:**
```bash
npm run client
```

Expected output in terminal 2:
```
── Unary call ──────────────────────────────
[client] received: "Hello, World!"

── Server-streaming call ───────────────────
[client] stream received: "Hello, World!"
[client] stream received: "Hi, World!"
[client] stream received: "Hey, World!"
[client] stream received: "Greetings, World!"
[client] stream received: "Howdy, World!"
[client] stream ended
```

## How it works

1. Both server and client load `greeter.proto` at runtime via `@grpc/proto-loader`.
2. The server registers handler functions and listens on port `50051`.
3. The client creates a **stub** – a local object whose methods transparently
   make network calls to the server.
4. For the **unary** call the stub works like a regular async function.
5. For the **server-streaming** call the stub returns a readable stream; the
   client listens to `data` events as the server writes messages one by one.
