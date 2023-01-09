import { View, Button, StyleSheet } from "react-native";

const StartScreen = ({navigation}) => {

  const styles = StyleSheet.create({
    view: {
      display: "flex",
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    button: {
      marginBottom: 20
    }
  });

  return (
    <View style={styles.view}>
      <View style={styles.button}>
        <Button title="Iniciar Servidor" onPress={() => navigation.navigate('Host')}/>
      </View>
      <Button title="Conectar a um Servidor" onPress={() => navigation.navigate('Client')}/>
    </View>
  );
}

export default StartScreen;