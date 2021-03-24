import { createServer } from 'net';

const server = createServer((socket) => {
  setInterval(() => {
    socket.write('msg');
  }, 10000);

  socket.on('data', (data) => {
    console.log(`Received ${data.toString()}`);
  });

  socket.on('error', () => {});
});

server.listen(3000, '0.0.0.0');
