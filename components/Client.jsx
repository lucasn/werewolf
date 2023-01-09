import { View, TextInput, Button, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import TcpSocket from "react-native-tcp-socket";
import { NetworkInfo } from "react-native-network-info";

import styles from "../styles/styles";

const clientStyles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 10
    }
});

const Client = () => {

    const [serverIp, setServerIp] = useState('');
    const [localAddress, setLocalAddress] = useState('');

    useEffect(() => {
		async function retrieveDeviceIp() {
			const ipAddress = await NetworkInfo.getIPV4Address();
			setLocalAddress(ipAddress);
		}

		retrieveDeviceIp();
	}, []);

    function connectToServer() {

        if (localAddress === '') return;

        const connectionOptions = {
            port: 15678,
            host: serverIp,
            localAddress: localAddress,
            reuseAddress: true
        };

        const client = TcpSocket.createConnection(connectionOptions, () => {
            const wasFlushed = client.write('Hello');
            console.log((wasFlushed) ? 'Enviado' : 'Não enviado');
            client.destroy();
        });
    }

    return (
        <View style={styles}>
            <View style={clientStyles.textInput}>
                <TextInput 
                    placeholder="Digite o IP do servidor" 
                    defaultValue={serverIp} 
                    onChangeText={ip => setServerIp(ip)}
                />
            </View>
            
            <Button title="Conectar" onPress={connectToServer}/>
        </View>
    )
}

export default Client;