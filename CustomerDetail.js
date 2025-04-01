/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    BackHandler
} from 'react-native';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';

const CustomerDetail = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const customer = route.params?.customer;

    const [data, setData] = useState([]);

    // Handle the back press event
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        // Cleanup the event listener on component unmount
        return () => {
            backHandler.remove();
        };
    }, []);

    // Handle the back press event
    const handleBackPress = () => {
        navigation.navigate('TotalCustomer'); // Navigate to the desired screen
        return true; // Prevent the default back action
    };
    // Check if customer data is available
    const renderCustomerDetails = () => {
        if (!customer) {
            return <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 20 }}>No customer data available.</Text>;
        }

        return (
            <View style={{ width: '90%', marginLeft: '5%', marginTop: '12%' }}>
                <View style={{ width: '100%', height: 70, borderBottomWidth: 1 }}>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Image source={require('../assets/user.png')} style={{ width: 22, height: 22, marginTop: 5 }} />
                        <Text style={{ fontSize: 15, fontFamily: 'InterMedium', marginLeft: 10, color: 'grey' }}>Customer Name:</Text>
                    </View>
                    <Text style={{ fontSize: 15, fontFamily: 'Regular', marginTop: 5, marginLeft: '10%' }}> {customer.customer_name}</Text>
                </View>
                <View style={{ width: '100%', height: 70, borderBottomWidth: 1 }}>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Image source={require('../assets/Email.png')} style={{ width: 22, height: 22, marginTop: 5 }} />
                        <Text style={{ fontSize: 15, fontFamily: 'InterMedium', marginLeft: 10, color: 'grey' }}>Email:</Text>
                    </View>
                    <Text style={{ fontSize: 15, fontFamily: 'Regular', marginTop: 5, marginLeft: '10%' }}> {customer.customer_email}</Text>
                </View>
                <View style={{ width: '100%', height: 70, borderBottomWidth: 1 }}>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Image source={require('../assets/Contact.png')} style={{ width: 22, height: 22, marginTop: 5, tintColor: '#000' }} />
                        <Text style={{ fontSize: 15, fontFamily: 'InterMedium', marginLeft: 10, color: 'grey' }}>Phone:</Text>
                    </View>
                    <Text style={{ fontSize: 15, fontFamily: 'Regular', marginTop: 5, marginLeft: '10%' }}> {customer.customer_contact}</Text>
                </View>
                <View style={{ width: '100%', height: 70, borderBottomWidth: 1 }}>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Image source={require('../assets/calendar.png')} style={{ width: 22, height: 22, marginTop: 5 }} />
                        <Text style={{ fontSize: 15, fontFamily: 'InterMedium', marginLeft: 10, color: 'grey' }}>Date:</Text>
                    </View>
                    <Text style={{ fontSize: 15, fontFamily: 'Regular', marginTop: 5, marginLeft: '10%' }}> N/A</Text>
                </View>
                <View style={{ width: '100%', height: 70, borderBottomWidth: 1 }}>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={{
                            width: 20, height: 20, borderRadius: 10, marginTop: 5, backgroundColor: customer.customer_status === 'ongoing' ? 'blue' :
                                customer.customer_status === 'cancel' ? 'red' :
                                    customer.customer_status === 'pending' ? 'yellow' :
                                        customer.customer_status === 'completed' ? 'green' :
                                            '#c8d1c2'
                        }}></View>
                        <Text style={{ fontSize: 15, fontFamily: 'InterMedium', marginLeft: 10, color: 'grey' }}>Status:</Text>
                    </View>
                    <Text style={{ fontSize: 15, fontFamily: 'Regular', marginTop: 5, marginLeft: '10%' }}> {customer.customer_status}</Text>
                </View>
                <View style={{ width: '100%', height: 70, borderBottomWidth: 1 }}>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Image source={require('../assets/card.png')} style={{ width: 22, height: 22, marginTop: 5 }} />
                        <Text style={{ fontSize: 15, fontFamily: 'InterMedium', marginLeft: 10, color: 'grey' }}>Category:</Text>
                    </View>
                    <Text style={{ fontSize: 15, fontFamily: 'Regular', marginTop: 5, marginLeft: '10%' }}> {customer.category_type}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', backgroundColor: 'skyblue', height: 50, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { navigation.navigate('TotalCustomer')}}>
                    <Image source={require('../assets/back2.png')} style={{ width: 22, height: 22, tintColor: '#000' }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, textAlign: 'center', color: '#000', marginLeft: '20%', fontFamily: 'interBlack',marginRight:15 }}>
                    CustomerDetail
                </Text>
                <TouchableOpacity style={{width:'15%', marginLeft:'10%' }} onPress={() => navigation.navigate('EditDetails', { customer })}>
                    <Image source={require('../assets/edit2.png')} style={{ width: 20, height: 20 ,marginLeft:'50%',tintColor:'black'}} />
                    
                </TouchableOpacity>
            </View>
            {renderCustomerDetails()}
        </View>
    );
};

export default CustomerDetail;