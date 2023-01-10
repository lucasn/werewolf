import { useState, useEffect } from "react";
import { NetworkInfo } from "react-native-network-info";
import TcpSocket from "react-native-tcp-socket";

export default function useClientSocket() {

  const [localAddress, setLocalAddress] = useState('');

  useEffect(() => {
    async function retrieveDeviceIp() {
      const ipAddress = await NetworkInfo.getIPV4Address();
      setLocalAddress(ipAddress);
    }

    retrieveDeviceIp();
  }, []);

  function connectToServer(ip, port, connectionCallback) {
    if (localAddress === '') return;

    const connectionOptions = {
      port: port,
      host: ip,
      localAddress: localAddress,
      reuseAddress: true
    };

    const client = TcpSocket.createConnection(connectionOptions, () => {
      connectionCallback(client);
    });
  }

  return connectToServer;
};