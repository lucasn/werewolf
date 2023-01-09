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

  const [serverIp, setServerIp] = useState('10.0.2.2');
  const [username, setUsername] = useState('');
  const [localAddress, setLocalAddress] = useState('');
  const [clientSocket, setClientSocket] = useState(null);

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
      setClientSocket(client);
    });
  }

  function sendUsernameToServer() {
    const message = {
      type: 'id',
      name: username
    };

    clientSocket.write(JSON.stringify(message));
  }

  function disconnectFromServer() {
    clientSocket.destroy();
  }

  return (
    <View style={styles}>
      {
        clientSocket ?
          (
            <View>
              <View style={clientStyles.textInput}>
                <TextInput
                  placeholder="Digite o seu nome"
                  defaultValue={username}
                  onChangeText={user => setUsername(user)}
                />
              </View>
              <Button title="Enviar" onPress={sendUsernameToServer} />
              <Button title="Desconectar" onPress={disconnectFromServer} />
            </View>
          )
          :
          (
            <View>
              <View style={clientStyles.textInput}>
                <TextInput
                  placeholder="Digite o IP do servidor"
                  defaultValue={serverIp}
                  onChangeText={ip => setServerIp(ip)}
                />
              </View>
              <Button title="Conectar" onPress={connectToServer} />
            </View>
          )
      }
    </View>
  )
}

export default Client;