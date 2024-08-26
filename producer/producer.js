const express = require('express');
const kafka = require('kafka-node');

// Initialize Express
const app = express();
const port = 4000;

// Create a Kafka client and producer
const kafkaClient = new kafka.KafkaClient({ kafkaHost: 'kafka:9093' });
const kafkaProducer = new kafka.Producer(kafkaClient);

kafkaProducer.on('ready', () => {
	console.log('Kafka Producer is connected and ready.');

	// Express route to send a message to the Kafka topic
	app.get('/send', (req, res) => {
		const payloads = [
			{
				topic: 'my-topic',
				messages: 'Kafka message from API hit!',
			},
		];

		kafkaProducer.send(payloads, (error, data) => {
			if (error) {
				console.error('Error sending message to Kafka:', error);
				res.status(500).send('Failed to send message to Kafka');
			} else {
				console.log('Message sent to Kafka:', data);
				res.send('Message sent to Kafka');
			}
		});
	});

	// Start the server
	app.listen(port, () => {
		console.log(`Producer server running at http://localhost:${port}`);
	});
});

kafkaProducer.on('error', (error) => {
  console.error('Kafka Producer error:', error);
});
