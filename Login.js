/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, BackHandler, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [securetextEntry, setSecureTextEntry] = useState(true);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState(''); // State for login error

    useEffect(() => {
        const checkLoginStatus = async () => {
            const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
            if (isLoggedIn === 'true') {
                // Navigate directly to DeskBoard
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'DeskBoard' }],
                });
            }
        };
        checkLoginStatus();
    }, []);
    const validateInputs = () => {
        let isValid = true;
        if (!email) {
            setEmailError('*Email is required.');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('*Invalid email format.');
            isValid = false;
        }
        if (!password) {
            setPasswordError('*Password is required.');
            isValid = false;
        }

        return isValid;
    };
    const getdata = async () => {
        if (!validateInputs()) return;

        const url = 'https://crm.linkvision.in/login.php';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    admin_email: email,
                    admin_password: password,
                }),
            });

            const result = await response.json();
            console.log(result); // Debugging purpose

            if (result.code === 200) {
                // Save data to AsyncStorage
                await AsyncStorage.setItem('admin_id', result.payload[0].admin_id);
                await AsyncStorage.setItem('isLoggedIn', 'true');

                // Log before navigation
                console.log("Navigating to DeskBoard...");
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'DeskBoard' }],
                });
            } else {
                if (result.message === "Invalid Email") {
                    setLoginError('Invalid Email. Please check your email address.');
                } else if (result.message === "Invalid Password") {
                    setLoginError('Incorrect Password. Please try again.');
                } else {
                    setLoginError('An error occurred during login. Please try again.');
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            setLoginError('An error occurred during login. Please try again.');
        }
    };
    const handleBackPress = () => {
        navigation.navigate("Home"); // Navigate to the desired screen
        return true; // Prevent the default back action
    };
    useEffect(() => {
            const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    
            // Cleanup the event listener on component unmount
            return () => {
                backHandler.remove();
            };
        }, []);

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#fff' }}>
        
            <View
                style={{
                    width: '80%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    marginBottom: '10%',
                }}
            >
                <Text style={{ fontSize: 50, fontFamily: 'interBlack', color: '#000' }}>LOGIN</Text>
                <View style={{ width: '100%', marginTop: '20%' }}>
                    {/* Email Input */}
                    <View
                        style={{
                            borderWidth: 1,
                            marginBottom: 5,
                            marginTop: 10,
                            height: 50,
                            borderColor: 'grey',
                            borderRadius: 10,
                            flexDirection: 'row',
                        }}
                    >
                        <TextInput
                            placeholder="Enter your Email"
                            placeholderTextColor={'grey'}
                            style={{
                                width: '90%',
                                height: '100%',
                                fontSize: 15,
                                fontFamily: 'InterMedium',
                                color: '#000',
                            }}
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                if (!text) {
                                    setEmailError('*Email is required.');
                                } else {
                                    setEmailError('');
                                }
                            }}
                        />
                        <Image source={require('../assets/Email.png')} style={{ width: 22, height: 22, marginTop: 15 }} />
                    </View>
                    {emailError ? <Text style={{ fontSize: 12, color: 'red', marginBottom: 10 }}>{emailError}</Text> : null}

                    {/* Password Input */}
                    <View
                        style={{
                            borderWidth: 1,
                            marginBottom: 5,
                            marginTop: 10,
                            height: 50,
                            borderColor: 'grey',
                            borderRadius: 10,
                            flexDirection: 'row',
                        }}
                    >
                        <TextInput
                            secureTextEntry={securetextEntry}
                            placeholder="Enter your Password"
                            placeholderTextColor={'grey'}
                            style={{
                                width: '90%',
                                height: '100%',
                                fontSize: 15,
                                fontFamily: 'InterMedium',
                                color: '#000',
                            }}
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                if (!text) {
                                    setPasswordError('*Password is required.');
                                } else {
                                    setPasswordError('');
                                }
                            }}
                        />
                        {securetextEntry ? (
                            <TouchableOpacity onPress={() => setSecureTextEntry(false)}>
                                <Image source={require('../assets/hide.png')} style={{ width: 22, height: 22, marginTop: 17 }} />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => setSecureTextEntry(true)}>
                                <Image source={require('../assets/visible.png')} style={{ width: 22, height: 22, marginTop: 17 }} />
                            </TouchableOpacity>
                        )}
                    </View>
                    {passwordError ? <Text style={{ fontSize: 12, color: 'red', marginBottom: 10 }}>{passwordError}</Text> : null}

                    {/* Login Error */}
                    {loginError ? <Text style={{ fontSize: 12, color: 'red', marginBottom: 10, textAlign: 'center' }}>{loginError}</Text> : null}

                    {/* Login Button */}
                    <TouchableOpacity
                        onPress={getdata}
                        style={{
                            borderRadius: 10,
                            marginBottom: 20,
                            marginTop: 10,
                            height: 55,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'skyblue',
                        }}
                    >
                        <Text style={{ fontSize: 19, fontFamily: 'interBlack', color: '#000' }}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Login;