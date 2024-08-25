const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const kafka = require('kafka-node');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server, {
	cors: {
    origin: "http://localhost", // Replace with the origin of your frontend
    methods: ["GET", "POST"]
  }
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost'); // Replace with your frontend origin
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


const kafkaClient = new kafka.KafkaClient({ kafkaHost: 'kafka:9093' });
const kafkaConsumer = new kafka.Consumer(
  kafkaClient,
  [{ topic: 'my-topic', partition: 0 }],
  { autoCommit: true }
);

kafkaConsumer.on('message', (message) => {
	console.log('Message received from producer: ', message.value);
});

io.on('connection', (socket) => {
  console.log('a user connected');

  kafkaConsumer.on('message', (message) => {
		console.log('Message received from producer: ', message.value);
    socket.emit('data', message.value);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(4001, () => {
  console.log('WebSocket server is running on port *:4001');
});
