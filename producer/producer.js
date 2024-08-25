const kafka = require('kafka-node');

// Create a Kafka client and producer
const client = new kafka.KafkaClient({ kafkaHost: 'kafka:9093' });
const producer = new kafka.Producer(client);

// Wait for the producer to be ready
producer.on('ready', () => {
	console.log('Producer is ready');

	// Send a message to the 'my-topic' topic
	const payloads = [
		{ topic: 'my-topic', messages: 'Hello Kafka!' }
	];

	producer.send(payloads, (err, data) => {
		if (err) {
			console.error('Error sending message:', err);
		} else {
			console.log('Message sent:', data);
		}
	});
});

// Handle errors
producer.on('error', (err) => {
	console.error('Producer error:', err);
});
