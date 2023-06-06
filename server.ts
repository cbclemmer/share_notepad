import express from 'express';
import { Server } from 'ws';
import http from 'http';

const app = express();
const server = http.createServer(app);
const wss = new Server({ server });

let clients: any[] = [];

wss.on('connection', (ws) => {
  clients.push(ws);

  ws.on('message', (message) => {
    console.log('Message: ' + message.toString())
    clients.forEach((client) => client.send(message));
  });

  ws.on('close', () => {
    clients = clients.filter((client) => client !== ws);
  });
});

server.listen(8080, () => {
  console.log('Server started on port 8080');
})