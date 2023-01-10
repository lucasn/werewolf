import { View, TextInput, Button, StyleSheet, ActivityIndicator, Text } from "react-native";
import { useState, useEffect } from "react";
import useClientSocket from "../hooks/useClientSocket";

import styles from "../../styles/styles";

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

  const SERVER_PORT = 15678;

  const [serverIp, setServerIp] = useState('10.0.2.2');
  const [username, setUsername] = useState('');
  const [clientSocket, setClientSocket] = useState(null);
  const [waitingForStart, setWaitingForStart] = useState(false);

  const connect = useClientSocket();

  function connectToServer() {
    connect(serverIp, SERVER_PORT, socket => setClientSocket(socket));
  }

  function sendUsernameToServer() {
    const message = {
      type: 'id',
      name: username
    };

    clientSocket.write(JSON.stringify(message));

    setWaitingForStart(true);
  }

  function disconnectFromServer() {
    clientSocket.destroy();
  }

  return (
    <View style={styles}>
      {
        waitingForStart ?
          (
            <View>
              <ActivityIndicator/>
              <Text>Esperando o servidor iniciar a partida</Text>
              <Button title="Desconectar" onPress={disconnectFromServer}/>
            </View>
          )
          :
          (
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
          )
      }
    </View>
  )
}

export default Client;