import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import SignupModal from '../components/SignupModal';
import * as SQLite from 'expo-sqlite';
import { UserContext } from '../UserContext';


export default function LoginScreen({ navigation }) {
  const { setUserId } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignupModalVisible, setisSignupModalVisible] = useState(false);

  // const db = SQLite.openDatabase("recipeApp");
  //     db.transaction(tx => {
  //       tx.executeSql(
  //         `SELECT * FROM users`,
  //         [],
  //         (_, res) => {
  //           if (res.rows.length > 0) {
  //            console.log(res.rows._array)
  //           }
  //         },
  //         (_, error) => reject(error)
  //       );
  //     });

  const checkIfUserExists = (email, password) => {
    return new Promise((resolve, reject) => {
      const db = SQLite.openDatabase("recipeApp");
      db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM users WHERE email = '${email}'`,
          [],
          (_, res) => {
            if (res.rows.length > 0) {
              const hashedPassword = password
              if (hashedPassword === res.rows._array[0]['password']) {
                resolve(res.rows._array[0]['userId']);
              } else {
                resolve(false);
              }
            } else {
              resolve(false);
            }
          },
          (_, error) => reject(error)
        );
      });
    });
  }




  const handleLogin = () => {
    setIsLoading(true);

    checkIfUserExists(email, password).then(id => {
      if (id) {
        setUserId(id)
        navigation.navigate('RecipeListScreen');
      } else {
        setError('Email or password is incorrect!')
      }
    }).catch(error => {
      console.log("Error: ", error);
    });
    setIsLoading(false);
  }


  return (
        <View style={styles.container}>
          <View>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
            />
          </View>
          <View style={styles.loginContainer}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={text => setEmail(text)}
              placeholder="Enter your email"
              placeholderTextColor="#A9A9A9"
            />
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              value={password}
              onChangeText={text => setPassword(text)}
              placeholder="Enter your password"
              placeholderTextColor="#A9A9A9"
            />
          </View>
          {error !== '' && <Text style={styles.error}>{error}</Text>}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleLogin(navigation)}>
              <Text style={styles.buttonText}>{isLoading ? 'Loading' : 'Sign in'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setisSignupModalVisible(true)}
            >
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
          </View>
          <SignupModal
            isVisible={isSignupModalVisible}
            onClose={() => setisSignupModalVisible(false)}
          />
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  loginContainer: {
    width: '80%'
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 60,
    resizeMode: 'contain'
  },
  label: {
    alignSelf: 'left',
    fontSize: 18,
    marginBottom: 10,
    color: '#646464',
    fontWeight: 'bold'
  },
  input: {
    height: 40,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#A9A9A9",
    marginBottom: 20,
    color: '#000000',
  },
  error: {
    width: '80%',
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#ff4848',
    borderRadius: 10,
    padding: 20,
    textAlign: 'center',
},
  button: {
    width: '35%',
    height: 40,
    backgroundColor: '#4aa15d',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    borderRadius: 10
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold'
  }
});
