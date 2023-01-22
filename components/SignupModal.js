import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { Modal } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import * as SQLite from 'expo-sqlite';


const SignupModal = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRetype, setPasswordRetype] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = () => {
        const db = SQLite.openDatabase("recipeApp");
        setIsLoading(true);
        if (email == '' || password == '' || passwordRetype == '') {
            setError('Please fill out all fields');
            setIsLoading(false);
            return;
        }
        if (!validateEmail(email)) {
            setError('Email is not valid');
            setIsLoading(false);
            return;
        }
        if (password !== passwordRetype) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }
        // if (!validatePassword(password)) {
        //     setError('Password should be at least 8 characters long and contain lower case, upper case, and numeric characters.');
        //     setIsLoading(false);
        //     return;
        // }
        checkIfEmailExists(email, db).then(exists => {
            if (!exists) {
                try {
                    insertUser(email, password, db);
                    setError('');
                } catch (error) {
                    console.log(error);
                }
                props.onClose();
            } else {
                setError("Email already in use");
            }
            setIsLoading(false);
        }).catch(error => {
            setIsLoading(false);
            console.log("Error: ", error);
        });
    }

    const validateEmail = (email) => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return regex.test(email);
    }

    const validatePassword = (password) => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        return regex.test(password);
    }

    const checkIfEmailExists = (email, db) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM users WHERE email = '${email}'`,
                    [],
                    (_, res) => {
                        if (res.rows._array.length > 0) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    },
                    (_, error) => reject(error)
                )
            })
        });
    }

    const insertUser = (email, password) => {
        // Password should be hashed before inserted IRL
        // react-native-bcrypt and react-native-sha256 failed me
        const hashedPassword = password;
        const db = SQLite.openDatabase("recipeApp");
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO users (email, password) VALUES (?, ?)`,
                [email, hashedPassword],
                (_, res) => {
                    console.log("User inserted successfully");
                },
                (_, error) => console.log(error)
            );
        });
    };


    return (
        <GestureRecognizer
            onSwipeDown={() => props.onClose()}
        >
            <Modal visible={props.isVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Sign Up</Text>
                    <View style={styles.loginContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            onChangeText={text => setEmail(text)}
                            value={email}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry={true}
                            onChangeText={text => setPassword(text)}
                            value={password}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Retype Password"
                            secureTextEntry={true}
                            onChangeText={text => setPasswordRetype(text)}
                            value={passwordRetype}
                        />
                        {error !== '' && <Text style={styles.error}>{error}</Text>}
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleSignup}>
                            <Text style={styles.buttonText}>{isLoading ? 'Loading' : 'Sign up'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={props.onClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </GestureRecognizer>
    );
};

export default SignupModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: '#4aa15d',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        elevation: 20,
        shadowColor: 'black',
    },
    loginContainer: {
        width: '80%',
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        margin: 50,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        color: '#000000',
        height: 40,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "white",
        marginBottom: 20,
    },
    error: {
        color: '#ff4848',
        fontWeight: 'bold',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        textAlign: 'center',
    },
    button: {
        width: '35%',
        height: 40,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        borderRadius: 10
    },
    buttonText: {
        color: '#4aa15d',
        fontWeight: 'bold'
    }
});

