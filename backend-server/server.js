const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const kafka = require('kafka-node');

const app = express();
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

const kafkaHost = 'kafka:9093';
const topicName = 'my-topic';
const retryInterval = 5000;

const checkTopicAndConnect = (socket) => {
  const kafkaClient = new kafka.KafkaClient({ kafkaHost });
  const admin = new kafka.Admin(kafkaClient); // Create Admin instance

  admin.listTopics((err, res) => {
    if (err) {
      console.error('Error listing topics:', err);
      kafkaClient.close();
      return setTimeout(() => checkTopicAndConnect(socket), retryInterval);
    }

		console.log('Response from Kafka.listTopics:', res);
    const topics = Object.keys(res[1].metadata);
    if (topics.includes(topicName)) {
      console.log(`Topic "${topicName}" is available. Connecting to Kafka...`);

      // Proceed with creating the consumer
      const kafkaConsumer = new kafka.Consumer(
        kafkaClient,
        [{ topic: topicName, partition: 0 }],
        { autoCommit: true }
      );

      kafkaConsumer.on('message', (message) => {
        console.log('Received message:', message);
				// Emit message when consumer receives it, so that other frontend service can catch it
				socket.emit('data', message);
      });

      kafkaConsumer.on('error', (error) => {
        console.error('Kafka Consumer error:', error);
      });

    } else {
      console.log(`Topic "${topicName}" is not available. Retrying in ${retryInterval / 1000} seconds...`);
      kafkaClient.close();
      setTimeout(() => checkTopicAndConnect(socket), retryInterval);
    }
  });
};

io.on('connection', (socket) => {
	console.log('a user connected');

	// Start the process
	checkTopicAndConnect(socket);

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

server.listen(4001, () => {
	console.log('WebSocket server is running on port *:4001');
});
