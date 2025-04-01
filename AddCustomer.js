/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert, Modal, FlatList, BackHandler } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddCustomer = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [events, setEvents] = useState(''); // To store the selected event
    const [loading, setLoading] = useState(false);
    const [selectEvent, setSelectEvent] = useState('Select Event');
    const [nameerror, setNameError] = useState('');
    const [emailerror, setEmailError] = useState('');
    const [contacterror, setContactError] = useState('');
    const [eventerror, setEventError] = useState('');

    const eventOptions = [
        { id: '1', text: 'Marriage' },
        { id: '2', text: 'Birthday Celebration' },
        { id: '3', text: 'Anniversary' },
        { id: '4', text: 'Concert' },
        { id: '5', text: 'Festival' },
    ];

    const validation = () => {
        let isValid = true;
        if (!name) {
            setNameError('*please put your name.');
            isValid = false;
        }
        if (!email) {
            setEmailError('*Email is required.');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('*Invalid email format.');
            isValid = false;
        } else {
            setEmailError('');
        }
        if (!contacterror) {
            setContactError('*please put your mobile no.');
            isValid = false;
        }
        if (!eventerror) {
            setEventError('*please select the event.');
            isValid = false;
        }
        return isValid;
    };

    const [modalVisible, setModalVisible] = useState(false);

    const handlePress = async () => {
        if (!validation()) return;
        if (!name || !email || !contact || !events) {
            Alert.alert('Error', 'All fields are required!');
            return;
        } else {
            navigation.navigate('DeskBoard');
        }

        try {
            setLoading(true);
            const url = 'https://crm.linkvision.in/customer_insert.php';

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customer_name: name,
                    customer_email: email,
                    customer_contact: contact,
                    category_type: events, // Include the selected event
                }),
            });

            const result = await response.json();
            console.log(result);
            if (result.code === '200') {
                await AsyncStorage.setItem('admin_id', result.payload[0].admin_id);
                await AsyncStorage.setItem('isLoggedIn', 'true');

                // Use popToTop to navigate back to the first screen in the stack (Deskboard)
                navigation.popToTop();
                navigation.navigate("DeskBoard");
            } else {
                // Handle error response
            }
        } catch (error) {
            console.error('Error adding customer:', error);
            Alert.alert('Error', 'Unable to connect to the server. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Reset fields when the screen comes into focus
    useFocusEffect(
        React.useCallback(() => {
            setEventError('');
            setContactError();
            setEmailError('');
            setNameError('');
            setName('');
            setEmail('');
            setContact('');
            setEvents('');
            setSelectEvent('Select Events');
        }, [])
    );

    // Handle hardware back button press
    useEffect(() => {
        const backAction = () => {
            navigation.navigate('DeskBoard'); // Navigate to DeskBoard
            return true; // Prevent default back action (exit app)
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        // Cleanup the event listener on component unmount
        return () => backHandler.remove();
    }, [navigation]);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', backgroundColor: 'skyblue', height: 50, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.navigate('DeskBoard')}>
                    <Image source={require('../assets/back2.png')} style={{ width: 22, height: 22, tintColor: '#000' }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, textAlign: 'center', color: '#000', marginLeft: '21%', fontFamily: 'interBlack' }}>
                    AddCustomer
                </Text>
                <View style={{ width: '31%' }}></View>
            </View>
            <View style={{ width: '80%', marginLeft: '10%', marginTop: '10%' }}>
                {/* Name Input */}
                <View style={{ width: '100%', flexDirection: 'row', borderWidth: 1, borderRadius: 10, }}>
                    <TextInput
                        placeholder="Enter Your Full Name"
                        placeholderTextColor={'grey'}
                        style={{ width: '88%', height: 50, padding: 10, fontSize: 15, fontFamily: 'InterMedium' }}
                        onChangeText={setName}
                        value={name}
                    />
                    <Image source={require('../assets/user.png')} style={{ width: 22, height: 22, marginTop: 10, }} />
                </View>
                {nameerror ? (<Text style={{ fontSize: 12, color: 'red', marginLeft: 10, marginTop: 5 }}>{nameerror}</Text>) : null}
                {/* Email Input */}
                <View style={{ width: '100%', flexDirection: 'row', borderWidth: 1, borderRadius: 10, marginTop: 20 }}>
                    <TextInput
                        placeholder="Enter Your Email"
                        placeholderTextColor={'grey'}
                        style={{ width: '88%', height: 50, padding: 10, fontSize: 15, fontFamily: 'InterMedium' }}
                        onChangeText={setEmail}
                        value={email}
                    />
                    <Image source={require('../assets/Email.png')} style={{ width: 22, height: 22, marginTop: 10, }} />
                </View>
                {emailerror ? (<Text style={{ fontSize: 12, color: 'red', marginLeft: 10, marginTop: 5 }}>{emailerror}</Text>) : null}

                {/* Contact Input */}
                <View style={{ width: '100%', flexDirection: 'row', borderWidth: 1, borderRadius: 10, marginTop: 20 }}>
                    <TextInput
                        placeholder="Enter Your Contact"
                        placeholderTextColor={'grey'}
                        style={{ width: '88%', height: 50, padding: 10, fontSize: 15, fontFamily: 'InterMedium', }}
                        onChangeText={setContact}
                        value={contact}
                        keyboardType='numeric'
                    />
                    <Image source={require('../assets/Contact.png')} style={{ width: 22, height: 22, marginTop: 10, tintColor: 'black' }} />
                </View>
                {contacterror ? (<Text style={{ fontSize: 12, color: 'red', marginLeft: 10, marginTop: 5 }}>{contacterror}</Text>) : null}

                {/* Dropdown */}
                <View style={{ width: '100%', flexDirection: 'row', borderWidth: 1, borderRadius: 10, marginTop: 20 }}>
                    <TouchableOpacity
                        style={{ width: '90%', height: 50, padding: 10 }}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={{ fontSize: 15, fontFamily: 'InterMedium' }}>{selectEvent}</Text>
                    </TouchableOpacity>
                    <Image source={require('../assets/select.png')} style={{ width: 22, height: 22, marginTop: 10, tintColor: 'black' }} />
                </View>

                {/* Modal for Events */}
                <Modal transparent visible={modalVisible}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: 'white', width: '80%', padding: 20, borderRadius: 10, marginTop: '40%' }}>
                            <FlatList
                                data={eventOptions}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setSelectEvent(item.text);
                                            setEvents(item.text);
                                            setModalVisible(false);
                                        }}
                                        style={{ padding: 10 }}
                                    >
                                        <Text>{item.text}</Text>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item) => item.id}
                            />
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text style={{ textAlign: 'center', color: 'red', marginTop: 10 }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {eventerror ? (<Text style={{ fontSize: 12, color: 'red', marginLeft: 10, marginTop: 5 }}>{eventerror}</Text>) : null}

                {/* Submit Button */}
                <TouchableOpacity
                    style={{
                        width: '80%',
                        marginTop: 20,
                        backgroundColor: 'skyblue',
                        height: 50,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: '10%'
                    }}
                    onPress={handlePress}
                    disabled={loading}
                >
                    <Text style={{ color: '#000', fontSize: 18, fontFamily: 'InterSemiBold' }}>{loading ? 'Adding...' : 'Add Customer'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddCustomer;
