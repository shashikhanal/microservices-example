const WebSocket = require('ws');

// const ws = new WebSocket('ws://localhost:4001');
const ws = new WebSocket('ws://localhost:4001');

ws.on('open', () => {
  console.log('Connected to WebSocket server');
});

ws.on('message', (data) => {
  console.log('Received from WebSocket server:', data);
});

ws.on('error', (error) => {
  console.error('WebSocket error:', error);
});
