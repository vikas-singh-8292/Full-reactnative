/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, BackHandler, StatusBar, } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeskBoard = () => {
    const navigation = useNavigation();
    const [statusCounts, setStatusCounts] = useState({
        pending: 0,
        completed: 0,
        cancel: 0,
        ongoing: 0,
    });

    const [totalCustomers, setTotalCustomers] = useState(0); // New state for total customers
    // Function to fetch status counts from the API
    const fetchStatusCounts = async () => {
        try {
            const response = await fetch('https://crm.linkvision.in/follow_up_insert.php', {
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                if (data.status && data.counts) {
                    const counts = {
                        pending: parseInt(data.counts.pending, 10) || 0,
                        completed: parseInt(data.counts.completed, 10) || 0,
                        cancel: parseInt(data.counts.cancel, 10) || 0,
                        ongoing: parseInt(data.counts.ongoing, 10) || 0,
                    };
                    setStatusCounts(counts);
                    // Calculate total number of customers
                    const total = counts.pending + counts.completed + counts.cancel + counts.ongoing;
                    setTotalCustomers(total); // Set the total customer count
                } else {
                    console.error('Unexpected response structure:', data);
                }
            } else {
                console.error('Failed to fetch status counts', response.status);
            }
        } catch (error) {
            console.error('Error fetching status counts:', error);
            Alert.alert('Error', 'Failed to fetch status counts.');
        }
    };
    useFocusEffect(
        React.useCallback(() => {
            // Fetch the data when the screen comes into focus
            fetchStatusCounts();
        }, [])
    );
    useFocusEffect(
        React.useCallback(() => {
            console.log('TotalCustomer screen focused');
            return () => console.log('TotalCustomer screen unfocused');
        }, [])
    );
    const handleLogout = async () => {
        Alert.alert(
            'Logout Confirmation',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Cancle',
                    onPress: () => console.log('Logout canceled'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        try {
                            await AsyncStorage.removeItem('admin_id');
                            await AsyncStorage.removeItem('isLoggedIn');
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Login' }],
                            });
                        } catch (error) {
                            console.error('Logout error:', error);
                            Alert.alert('An error occurred during logout. Please try again.');
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };


    return (
        <View style={{ flex: 1 }}>
        <StatusBar
                        animated={true}
                        backgroundColor="skyblue"
                        barStyle={'dark-content'}
                        
                    />
            <View style={{ flexDirection: 'row', backgroundColor: 'skyblue', height: 50 }}>
                <View style={{ flex: 1, alignItems: 'center', marginTop: 10, marginLeft: 10 }}>
                    <Text style={{
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#000',
                        fontFamily: 'interBlack',
                        marginLeft: 20
                    }}>
                        Akka Events
                    </Text>
                </View>
                <View style={{ marginTop: 15, marginRight: 10, marginLeft: 18 }}>
                    <TouchableOpacity onPress={handleLogout}>
                        <Image source={require('../assets/arrow.png')} style={{ width: 20, height: 20, tintColor: '#000' }} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ width: '90%', marginTop: '20%', marginLeft: '5%' }}>
                {/* Add Customer */}
                <TouchableOpacity style={{
                    width: '100%',
                    height: 50,
                    backgroundColor: 'skyblue',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                    elevation: 5,
                    flexDirection: 'row'
                }} onPress={() => navigation.navigate("AddCustomer")}>
                    <Text style={{
                        fontSize: 18,
                        fontFamily: 'InterSemiBold',
                        color: '#000',
                        width: '80%'
                    }}>Add Customer</Text>
                    <Image source={require('../assets/plus-symbol-button.png')} style={{ width: 25, height: 25, tintColor: '#000' }} />
                </TouchableOpacity>

                {/* Follow Up */}
                <TouchableOpacity style={{
                    width: '100%',
                    height: 50,
                    backgroundColor: 'skyblue',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                    marginTop: 20,
                    flexDirection: 'row'
                }} onPress={() => navigation.navigate("FollowUpcus")}>
                    <Text style={{
                        fontSize: 18,
                        fontFamily: 'InterSemiBold',
                        color: '#000',
                        width: '80%'
                    }}>Follow Up</Text>
                    <Image source={require('../assets/card.png')} style={{ width: 25, height: 25, tintColor: '#000' }} />
                </TouchableOpacity>

                {/* View Customers */}
                <TouchableOpacity style={{
                    width: '100%',
                    height: 50,
                    backgroundColor: 'skyblue',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                    marginTop: 20,
                    flexDirection: 'row'
                }} onPress={() => navigation.navigate('TotalCustomer')}>
                    <Text style={{
                        fontSize: 18,
                        fontFamily: 'InterSemiBold',
                        color: '#000',
                        width: '80%'
                    }}>View Customers</Text>
                    <Image source={require('../assets/visible.png')} style={{ width: 30, height: 30, tintColor: '#000' }} />
                </TouchableOpacity>

                {/* Total Customer */}
                <View style={{
                    width: '100%',
                    height: 50,
                    backgroundColor: 'skyblue',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                    marginTop: 20,
                    flexDirection: 'row',
                    marginBottom: '20%'
                }}>
                    <Text style={{
                        fontSize: 18,
                        fontFamily: 'InterSemiBold',
                        color: '#000',
                        width: '80%'
                    }}>Total Customer</Text>
                    <Text style={{
                        fontSize: 18,
                        fontFamily: 'InterMedium',
                        color: '#000'
                    }}>
                        {totalCustomers}
                    </Text>
                </View>


                {/* Status Counts with Colors */}
                {Object.entries(statusCounts).map(([key, value]) => {
                    let statusColor;
                    switch (key) {
                        case 'pending':
                            statusColor = 'orange';
                            break;
                        case 'completed':
                            statusColor = 'green';
                            break;
                        case 'cancel':
                            statusColor = 'red';
                            break;
                        case 'ongoing':
                            statusColor = 'blue';
                            break;
                        default:
                            statusColor = 'gray';
                    }

                    return (
                        <View key={key} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <View
                                style={{
                                    width: 15,
                                    height: 15,
                                    borderRadius: 7.5,
                                    backgroundColor: statusColor,
                                    marginRight: 10,
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontFamily: 'InterSemiBold',
                                    color: 'blue',
                                    marginRight: 5,
                                }}
                            >
                                {key.charAt(0).toUpperCase() + key.slice(1)}:
                            </Text>
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontFamily: 'InterSemiBold',
                                    color: 'blue',
                                }}
                            >
                                {value}
                            </Text>
                        </View>
                    );
                })}

            </View>
        </View>
    );
};

export default DeskBoard;