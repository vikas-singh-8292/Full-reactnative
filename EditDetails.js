/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    Image, BackHandler
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const EditDetails = () => {
    const navigation = useNavigation();
    const route = useRoute();

    // State variables for customer details
    const [customer, setCustomer] = useState(route.params?.customer || {});
    const [customerName, setCustomerName] = useState(customer?.customer_name || '');
    const [customerEmail, setCustomerEmail] = useState(customer?.customer_email || '');
    const [customerContact, setCustomerContact] = useState(customer?.customer_contact || '');
    const [categoryType, setCategoryType] = useState(customer?.category_type || '');
    const [loading, setLoading] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectdate, setSelectdate] = useState('');
    const [isclicked, setIsClicked] = useState();

    // Update state when route params change (i.e., new customer data is passed)
    const showDatePicker = () => { setDatePickerVisibility(true) };
    const hideDatePicker = () => setDatePickerVisibility(false);

    const handleConfirm = (date) => {
        const dt = new Date(date);
        const formattedDate = `${dt.getDate().toString().padStart(2, '0')}/${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt.getFullYear() }`;
        setSelectdate(formattedDate); 
        hideDatePicker();
    };
    useEffect(() => {
        if (route.params?.customer) {
            const updatedCustomer = route.params.customer;
            setCustomer(updatedCustomer);
            setCustomerName(updatedCustomer.customer_name || '');
            setCustomerEmail(updatedCustomer.customer_email || '');
            setCustomerContact(updatedCustomer.customer_contact || '');
            setCategoryType(updatedCustomer.category_type || '');
        }
    }, [route.params?.customer]);

    const handleSave = async () => {
        navigation.navigate("CustomerDetail", { customer });
        // Validate input
        if (!customerName || !customerEmail || !customerContact || !categoryType) {
            Alert.alert('Error', 'All fields are required.');
            return;
        }

        // Prepare the API request
        const apiUrl = 'https://crm.linkvision.in/customer_insert.php';
        const body = {
            customer_name: customerName,
            customer_email: customerEmail,
            customer_contact: customerContact,
            category_type: categoryType,
        };

        setLoading(true);
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const result = await response.json();
            setLoading(false);

            if (response.ok) {
                Alert.alert('Success', result.message || 'Customer details updated successfully.');

                // Navigate back to CustomerDetail with updated customer details
                navigation.navigate('CustomerDetail', {
                    customer: {
                        ...customer,
                        customer_name: customerName,
                        customer_email: customerEmail,
                        customer_contact: customerContact,
                        category_type: categoryType,
                    },
                });
            } else {
                Alert.alert('Error', result.message || 'Failed to update customer details.');
            }
        } catch (error) {
            setLoading(false);
            Alert.alert('Error', 'Something went wrong. Please try again later.');
        }
    };
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        // Cleanup the event listener on component unmount
        return () => {
            backHandler.remove();
        };
    }, []);

    // Handle the back press event
    const handleBackPress = () => {
        navigation.navigate("CustomerDetail", { customer }); // Navigate to the desired screen
        return true; // Prevent the default back action
    };

    return (
        <View style={{
            flex: 1,
        }}>
            <View
                style={{
                    flexDirection: 'row',
                    backgroundColor: 'skyblue',
                    height: 50,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity onPress={() => navigation.navigate("CustomerDetail", { customer })}>
                    <Image
                        source={require('../assets/back2.png')}
                        style={{ width: 22, height: 22, tintColor: '#000' }}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#000',
                        marginLeft: '21%',
                        fontFamily: 'interBlack',
                    }}
                >
                    Update Details
                </Text>
                <View style={{ width: '31%' }}></View>
            </View>
            <View style={{ padding: 20 }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginBottom: 5,
                }}>Customer Name</Text>
                <TextInput
                    style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 5,
                        padding: 10,
                        marginBottom: 15,
                        fontSize: 16,
                    }}
                    value={customerName}
                    onChangeText={setCustomerName}
                />

                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginBottom: 5,
                }}>Email</Text>
                <TextInput
                    style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 5,
                        padding: 10,
                        marginBottom: 15,
                        fontSize: 16,
                    }}
                    value={customerEmail}
                    onChangeText={setCustomerEmail}
                    keyboardType="email-address"
                />



                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginBottom: 5,
                }}>Date</Text>
                <TouchableOpacity style={{ width: '100%', height: 45,  flexDirection: 'row', borderWidth: 0.5, borderRadius: 5, marginBottom:20 ,borderColor:'grey'}} onPress={showDatePicker}>
                    <Text style={{ width: '83%', fontSize: 15, marginTop: 10, marginLeft: '5%', fontFamily: 'InterMedium' }}>{selectdate ? `${selectdate}` : "Select Date"}</Text>
                    <Image source={require('../assets/calendar.png')} style={{ width: 25, height: 25, marginTop: 15 }} />
                </TouchableOpacity>
                <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={hideDatePicker} />

                <TouchableOpacity
                    style={{
                        backgroundColor: 'skyblue',
                        padding: 15,
                        borderRadius: 5,
                        alignItems: 'center',
                    }}
                    onPress={handleSave}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#fff',
                        }}>Update</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default EditDetails;