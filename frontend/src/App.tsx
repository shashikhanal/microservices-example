import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const App: React.FC = () => {
	const [data, setData] = useState<string>('No data!');

	useEffect(() => {
		console.log('Frontend loaded!');
		// Connect to the WebSocket server
		const socket = io('http://localhost:4001');

		socket.on('connect', () => {
			console.log('Connected to WebSocket server');
		});

		// Listen for messages from the server
		socket.on('data', (message: string) => {
			console.log('Received data:', message);
			setData(message);
		});

		// Cleanup on component unmount
		return () => {
			socket.disconnect();
		};
	}, []);

	return (
		<div>
			<h1>Real-Time Data from Kafka</h1>
			<p>{data}</p>
		</div>
	);
};

export default App;
