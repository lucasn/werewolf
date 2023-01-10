import { View, Button, StyleSheet } from "react-native";
import Sound from 'react-native-sound';

const Home = ({navigation}) => {

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

  function soundTest() {
    const testSound = new Sound('test.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Failed to load sound: ', error);
      }
      else {
        testSound.play(success => {
          const logMessage = success ? 'Sound has been played' : 'Failed while playing sound';
          console.log(logMessage);
        })
      }
    })
  }

  return (
    <View style={styles.view}>
      <View style={styles.button}>
        <Button title="Iniciar Servidor" onPress={() => navigation.navigate('Server')}/>
      </View>
      <Button title="Conectar a um Servidor" onPress={() => navigation.navigate('Client')}/>
      <Button title="Testar som" onPress={soundTest}/>
    </View>
  );
}

export default Home;