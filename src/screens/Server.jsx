import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import { NetworkInfo } from "react-native-network-info";
import TcpSocket from 'react-native-tcp-socket';

import styles from "../../styles/styles";

const Server = () => {
	const [deviceIp, setDeviceIp] = useState('');
	const [server, setServer] = useState(null);
	const [clients, setClients] = useState([]);

	useEffect(() => {
		async function retrieveDeviceIp() {
			const ipAddress = await NetworkInfo.getIPV4Address();
			setDeviceIp(ipAddress);
		}

		retrieveDeviceIp();
	}, []);

	useEffect(() => {
		if (deviceIp !== '') {
			const server = TcpSocket.createServer(socket => {

				socket.on('data', data => console.log(`Data: ${data}`));

				socket.on('close', error => {
					const clientAddress = `${socket.remoteAddress}:${socket.remotePort}`;
					console.log(`Connection closed with ${clientAddress}`);
					setClients(oldClients => oldClients.filter(c => c !== clientAddress));
				});

				socket.on('error', error => console.log(`Error: ${error}`));

				socket.on('connect', socket => {
					const clientAddress = `${socket.remoteAddress}:${socket.remotePort}`;
					console.log(`Connected with address: ${clientAddress}`);
				});

			});

			server.on('error', (error) => {
				console.log('erro: ' + error);
			});

			server.on('close', () => {
				console.log('Server closed connection');
			});

			server.on('listening', () => console.log('escutando'));

			server.on('connection', socket => {
				console.log(`Connected with address: ${socket.remoteAddress}:${socket.remotePort}`)		
				setClients(oldClients => [...oldClients, `${socket.remoteAddress}:${socket.remotePort}`]);
			})

			server.listen({ port: 15678, host: deviceIp });

			setServer(server);
		}
	}, [deviceIp]);



	return (
    <View style={styles}>
				{
					(clients.length === 0) ? <Text style={{color: 'black'}}>Nenhum jogador conectado</Text>
					: clients.map(client => (
							<Text key={client} style={{color: 'black'}}>{client}</Text>
					))
				}
    </View>
  );
}

export default Server;