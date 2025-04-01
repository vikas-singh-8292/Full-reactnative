/* eslint-disable quotes */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Modal, FlatList, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const FollowUpcus = () => {
    const navigation = useNavigation();
    const [isClicked, setIsClicked] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [type, setType] = useState(null);
    const [customerData, setCustomerData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isClick, setIsClick] = useState(false);
    const [selectadd, setSelectadd] = useState('Status');
    const [modalvisible, setModalvisible] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectdate, setSelectdate] = useState('');
    const [statusCounts, setStatusCounts] = useState({
        pending: 0,
        completed: 0,
        cancel: 0,
        ongoing: 0,
    });

    const Data = [
        { id: '1', status: 'OnGoing', color: 'blue', borderColor: 'blue' },
        { id: '2', status: 'Canceled', color: 'red', borderColor: 'red' },
        { id: '3', status: 'Completed', color: 'green', borderColor: 'green' },
        { id: '4', status: 'Pending', color: '#FFD700', borderColor: '#DAA520' },
    ];

    const selectedItem = Data.find((item) => item.status === selectadd);

    const fetchCustomerData = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://crm.linkvision.in/customer_list.php', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setCustomerData(data || []); // Ensure no null data
        } catch (error) {
            Alert.alert("Error", error.message || "Failed to fetch customer data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isClicked) {
            fetchCustomerData();
        }
    }, [isClicked]);

    useFocusEffect(
        React.useCallback(() => {
            setSelectedCustomer(null);
            setType(null);
            setSelectdate('');
            setSelectadd('Status');
            setIsClicked(false);
            setIsClick(false);
        }, [])
    );

    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);

    const handleConfirm = (date) => {
        const dt = new Date(date);
        const formattedDate = `${dt.getDate().toString().padStart(2, '0')}/${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt.getFullYear() }`;
        setSelectdate(formattedDate);
        hideDatePicker();
    };

    const savedata = async () => {
        if (!selectedCustomer) {
            Alert.alert("Validation Error", "Please select a customer.");
            return;
        }
        if (!selectdate) {
            Alert.alert("Validation Error", "Please select a date.");
            return;
        }
        if (selectadd === 'Status' || !selectadd) {
            Alert.alert("Validation Error", "Please select a valid status.");
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                customer_name: selectedCustomer,
                date: selectdate,
                customer_status: selectadd,
            }),
        };
        console.log({ "my": requestOptions });

        try {
            const response = await fetch('https://crm.linkvision.in/follow_up_insert.php', requestOptions);
            const data = await response.json();
            console.log(data);
            if (data.status) {
                Alert.alert("Success", data.message);

                if (data.counts) {
                    setStatusCounts({
                        pending: parseInt(data.counts.pending, 10),
                        completed: parseInt(data.counts.completed, 10),
                        cancel: parseInt(data.counts.cancel, 10),
                        ongoing: parseInt(data.counts.ongoing, 10),
                    });
                }

                navigation.navigate("DeskBoard");
            } else {
                Alert.alert("Error", "Failed to save data.");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to save data due to a server issue.");
        }
    };
    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', backgroundColor: 'skyblue', height: 50, width: '100%' }}>
                <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.navigate('DeskBoard')}>
                    <Image source={require('../assets/back2.png')} style={{ width: 22, height: 22, tintColor: '#000', marginTop: 10 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, textAlign: 'center', color: '#000', marginLeft: '29%', fontFamily: 'interBlack', marginTop: 10 }}>
                    Follow Up
                </Text>
            </View>

            {/* Form */}
            <View style={{ width: '90%', marginLeft:'5%',marginTop: '10%' }}>
                {/* Customer Selection */}
                <TouchableOpacity
                    style={{
                        width: '100%',
                        height: 50,
                        backgroundColor: '#fff',
                        flexDirection: 'row',
                        borderWidth: 1,
                        borderRadius: 10,
                    }}
                    onPress={() => {
                        setIsClicked(!isClicked);
                        setModalVisible(true);
                    }}
                >
                    <Text style={{ width: '82%', fontSize: 15, marginTop: 12, marginLeft: '5%', fontFamily: 'InterMedium' }}>
                        {selectedCustomer ? selectedCustomer : 'Select Customer'}
                    </Text>
                    {!isClicked ? (
                        <Image source={require('../assets/Drop-down.png')} style={{ width: 20, height: 20, marginTop: 15, marginLeft: 10 }} />
                    ) : (
                        <Image source={require('../assets/drop-up.png')} style={{ width: 40, height: 40, marginTop: 5 }} />
                    )}
                </TouchableOpacity>
                <View style={{ width: '100%', height: 50, borderWidth: 1, borderRadius: 10, marginTop: 20, backgroundColor: '#fff' }}>
                    <Text style={{ width: '82%', fontSize: 15, marginTop: 12, marginLeft: '5%', fontFamily: 'InterMedium' }}>{type}</Text>
                </View>

                {isClicked && (
                    <Modal transparent={true} animationType="slide" visible={modalVisible}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{ flex: 1, alignItems: 'center', marginBottom: '50%',justifyContent:'center' }}
                            onPress={() => {
                                setIsClicked(false);
                                setModalVisible(false);
                            }}
                        >
                            <View style={{ backgroundColor: '#fff', height: '50%', borderRadius: 10, width: '90%', elevation: 1 }}>
                                {loading ? (
                                    <ActivityIndicator size="large" color="#0000ff" />
                                ) : (
                                    <FlatList
                                        data={customerData}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                activeOpacity={1}
                                                style={{ marginTop: 5, width: '90%', height: 40, alignSelf: 'center' ,
                                                }}
                                                onPress={() => {
                                                    setSelectedCustomer(item.customer_name);
                                                    setType(item.category_type);
                                                    setIsClicked(false);
                                                    setModalVisible(false);
                                                    
                                                }}
                                            >
                                                <Text style={{ fontSize: 15, marginTop: 10, fontFamily: 'InterSemiBold', color: 'grey' }}>
                                                    {item.customer_name}
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                )}
                            </View>
                        </TouchableOpacity>
                    </Modal>
                )}

                {/* Other Inputs */}
                <TouchableOpacity style={{ width: '100%', height: 50, backgroundColor: '#fff', flexDirection: 'row', borderWidth: 1, borderRadius: 10, marginTop: 20 }} onPress={showDatePicker}>
                    <Text style={{ width: '83%', fontSize: 15, marginTop: 12, marginLeft: '5%', fontFamily: 'InterMedium' }}>{selectdate ? `${selectdate}` : "Select Date"}</Text>
                    <Image source={require('../assets/calendar.png')} style={{ width: 25, height: 25, marginTop: 15 }} />
                </TouchableOpacity>
                <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={hideDatePicker} />

                <View style={{ width: '100%', height: 50, backgroundColor: '#fff', flexDirection: 'row', borderWidth: 1, borderRadius: 10, marginTop: 20 }}>
                    <TextInput placeholderTextColor={'grey'} placeholder='Enter Here' style={{ width: '87%', fontSize: 15, fontFamily: 'InterMedium', height: '100%' }} />
                    <Image source={require('../assets/pen.png')} style={{ width: 22, height: 22, marginTop: 12 }} />
                </View>

                {/* Status Selector */}
                <TouchableOpacity
                    style={{
                        width: '100%',
                        height: 50,
                        backgroundColor: '#fff',
                        flexDirection: 'row',
                        borderWidth: 1,
                        borderRadius: 10,
                        marginTop: 20,
                        borderColor: selectedItem?.borderColor || '#000',
                    }}
                    onPress={() => {
                        setIsClick(!isClick);
                        setModalvisible(true);
                    }}
                >
                    <Text
                        style={{
                            width: '82%',
                            fontSize: 15,
                            marginTop: 15,
                            marginLeft: '5%',
                            fontFamily: 'InterMedium',
                            color: selectedItem?.color || '#000',
                        }}
                    > {selectadd}
                    </Text>
                    {!isClick ? (
                        <Image source={require('../assets/Drop-down.png')} style={{ width: 20, height: 20, marginTop: 15, marginLeft: 10 }} />
                    ) : (
                        <Image source={require('../assets/drop-up.png')} style={{ width: 40, height: 40, marginTop: 5 }} />
                    )}
                </TouchableOpacity>

                {isClick ? (
                    <Modal transparent={true} animationType="slide" visible={modalvisible}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 0 }}
                            onPress={() => {
                                setIsClick(false);
                            }}
                        >
                            <View style={{ backgroundColor: '#fff', height: '32%', borderRadius: 10, width: '95%', marginBottom: '20%' }}>
                                <FlatList
                                    data={Data}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            style={{ marginTop: 5, width: '90%', height: 50, alignSelf: 'center' }}
                                            onPress={() => {
                                                setSelectadd(item.status);
                                                setIsClick(false);


                                            }}
                                        >
                                            <Text style={{ fontSize: 16, marginTop: 10, marginLeft: 10, fontFamily: 'InterSemiBold', color: 'grey' }}>
                                                {item.status}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </TouchableOpacity>
                    </Modal>
                ) : null}

                {/* Save Button */}
                <TouchableOpacity
                    style={{
                        width: '80%',
                        height: 50,
                        backgroundColor: 'skyblue',
                        flexDirection: 'row',
                        borderRadius: 10,
                        marginTop: 20,
                        marginLeft: '10%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={savedata}
                >
                    <Text style={{ fontSize: 18, color: '#000', fontFamily: 'InterSemiBold' }}>Save Data</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default FollowUpcus;