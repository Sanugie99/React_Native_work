import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, Alert, SafeAreaView } from 'react-native';

export default function App() {

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const signup = () => {
    if (id.trim() !== '' && password.trim() !== '' && email.trim() !== '') {
      Alert.alert(`입력된 id는 ${id}, 이메일은 ${email}`);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SmartAppDev</Text>
      <View style={styles.mainContainer}>
        <Text style={styles.signupText}>회원 가입</Text>
        <View style={styles.inputText}>
          <Text style={styles.text}>아이디</Text>
          <TextInput style={styles.inputLine} value={id} onChangeText={setId}></TextInput>
        </View>
        <View style={styles.inputText}>
          <Text style={styles.text}>비밀번호</Text>
          <TextInput style={styles.inputLine} value={password} onChangeText={setPassword}></TextInput>
        </View>
        <View style={styles.inputText}>
          <Text style={styles.text}>메일</Text>
          <TextInput style={styles.inputLine} value={email} onChangeText={setEmail}></TextInput>
        </View>
        <Pressable style={styles.button} onPress={signup}>
          <Text style={styles.buttonText}>가입하기</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  mainContainer: {
    margin: 50,
    width: '80%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  title: {
    backgroundColor: 'blue',
    width: '100%',
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left',
    marginBottom: 20,
  },

  signupText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginLeft: 50,
    marginRight: 50,
  },

  text: {
    fontSize: 15,
    color: 'gray',
  },

  inputLine: {
    width: '60%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 5,
    margin: 15,
  },

  button: {
    backgroundColor: 'blue',
    padding: 8,
    width: '60%',
    borderRadius: 5,
    margin: 30,
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 15,
    color: 'white',
  }

});
