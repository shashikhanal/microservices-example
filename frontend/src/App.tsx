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
		socket.on('data', (message: { topic: string, value: string}) => {
			console.log('Received data:', message);
			setData(message.value || 'Error: value property is not set');
		});

		// Cleanup on component unmount
		return () => {
			socket.disconnect();
		};
	}, []);

	return (
		<div className="message-container">
			<h1>Real-Time Orders</h1>
			<p>{data}</p>
		</div>
	);
};

export default App;
