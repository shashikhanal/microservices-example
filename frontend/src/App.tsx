import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const App: React.FC = () => {
	const [data, setData] = useState<{ [key: number]: string }>({});

	useEffect(() => {
		const handleIncomingData = (value: string) => {
			setData(prevData => {
				const index: number = Object.keys(prevData).length;

				return {
					...prevData,
					[index]: value
				};
			});
		}

		console.log('Frontend loaded!');
		// Connect to the WebSocket server
		const socket = io('http://localhost:4001');

		socket.on('connect', () => {
			console.log('Connected to WebSocket server');
		});

		// Listen for messages from the server
		socket.on('data', (message: { topic: string, value: string}) => {
			console.log('Received data:', message);

			handleIncomingData(message.value);
		});

		// Cleanup on component unmount
		return () => {
			socket.disconnect();
		};
	}, []);

	return (
		<div className="message-container">
			<h1>Real-Time Orders</h1>
			<ul>
				{Object.entries(data).map(([key, value], index) => (
					<li key={index}>
						<p>{value}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;
