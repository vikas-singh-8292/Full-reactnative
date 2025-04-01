/* eslint-disable no-catch-shadow */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    BackHandler,
    ActivityIndicator,
} from 'react-native';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';

const TotalCustomer = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const isFocused = useIsFocused();
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('TotalCustomer');

    // Fetch customer data from API
    const getApiData = async () => {
        setLoading(true);
        setError('');
        try {
            const url = 'https://crm.linkvision.in/customer_list.php';
            let result = await fetch(url);
            result = await result.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching customer data:', error);
            setError('Failed to load customer data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Re-fetch data when the screen is focused
    useEffect(() => {
        if (isFocused) {
            getApiData();
        }
    }, [isFocused]);

    // Handle back button press
    const handleBackPress = () => {
        navigation.navigate('DeskBoard');
        return true; // Prevent default back action
    };

    // Add back handler listener
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackPress
        );

        return () => backHandler.remove(); // Cleanup the listener
    }, []);

    // Reset search query when the screen is focused
    useFocusEffect(
        React.useCallback(() => {
            setSearchQuery('');
        }, [])
    );

    // Filtered customer data based on search query
    const filteredData = data.filter((item) =>
        item.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View>
            {/* Header */}
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
                <TouchableOpacity onPress={handleBackPress}>
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
                    CustomerList
                </Text>
                <View style={{ width: '31%' }}></View>
            </View>

            {/* Search Bar */}
            <View style={{ width: '95%', marginLeft: '2.5%', marginTop: 15 }}>
                <View
                    style={{
                        width: '100%',
                        height: 50,
                        borderRadius: 10,
                        flexDirection: 'row',
                        borderWidth: 1,
                    }}
                >
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Image
                            source={require('../assets/Search.png')}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: 'black',
                                marginTop: 12,
                                marginLeft: 10,
                            }}
                        />
                        <TextInput
                            placeholder="Search here..."
                            placeholderTextColor={'grey'}
                            style={{
                                flex: 1,
                                fontSize: 15,
                                fontFamily: 'InterMedium',
                                color: 'grey',
                                height: '100%',
                            }}
                            value={searchQuery}
                            onChangeText={(text) => setSearchQuery(text)}
                        />
                        {searchQuery ? (
                            <TouchableOpacity onPress={() => setSearchQuery('')}>
                                <Image
                                    source={require('../assets/cancel.png')}
                                    style={{
                                        width: 18,
                                        height: 18,
                                        marginTop: 15,
                                        marginRight: 10,
                                    }}
                                />
                            </TouchableOpacity>
                        ) : null}
                    </View>
                </View>

                {/* Customer List */}
                <View style={{ marginBottom: '75%' }}>
                    {loading ? (
                        <ActivityIndicator size="large" color="orange" />
                    ) : error ? (
                        <Text
                            style={{
                                textAlign: 'center',
                                marginTop: 20,
                                fontSize: 16,
                                color: 'red',
                            }}
                        >
                            {error}
                        </Text>
                    ) : filteredData.length ? (
                        <FlatList
                            keyboardShouldPersistTaps="handled"
                            data={filteredData}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={{
                                        marginTop: 20,
                                        width: '100%',
                                        height: 70,
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        backgroundColor:
                                            item.customer_status === 'ongoing'
                                                ? '#c1eaf5'
                                                : item.customer_status === 'cancel'
                                                    ? 'red'
                                                    : item.customer_status === 'pending'
                                                        ? '#f5c778'
                                                        : item.customer_status === 'completed'
                                                            ? '#baf29b'
                                                            : '#c8d1c2',
                                    }}
                                    onPress={() =>
                                        navigation.navigate('CustomerDetail', {
                                            customer: item,
                                        })
                                    }
                                >
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            marginTop: 10,
                                            marginLeft: 5,
                                        }}
                                    >
                                        <Image
                                            source={require('../assets/user.png')}
                                            style={{ width: 18, height: 18 }}
                                        />
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontFamily: 'InterSemiBold',
                                                marginLeft: 5,
                                                width: '60%',
                                            }}
                                        >
                                            {item.customer_name}
                                        </Text>
                                        <View
                                            style={{
                                                width: 16,
                                                height: 16,
                                                borderRadius: 8,
                                                backgroundColor:
                                                    item.customer_status === 'ongoing'
                                                        ? 'blue'
                                                        : item.customer_status === 'cancel'
                                                            ? 'red'
                                                            : item.customer_status === 'pending'
                                                                ? 'yellow'
                                                                : item.customer_status === 'completed'
                                                                    ? 'green'
                                                                    : 'grey',
                                                marginTop: 5,
                                            }}
                                        ></View>
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontFamily: 'InterSemiBold',
                                                marginLeft: 5,
                                            }}
                                        >
                                            {item.customer_status}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            marginTop: 5,
                                            marginLeft: 5,
                                        }}
                                    >
                                        <Image
                                            source={require('../assets/event.png')}
                                            style={{ width: 18, height: 18 }}
                                        />
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontFamily: 'InterSemiBold',
                                                marginLeft: 5,
                                                width: '55%',
                                            }}
                                        >
                                            {item.category_type}
                                        </Text>
                                        <Image
                                            source={require('../assets/Contact.png')}
                                            style={{
                                                width: 18,
                                                height: 18,
                                                tintColor: '#000',
                                            }}
                                        />
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontFamily: 'InterSemiBold',
                                                marginLeft: 5,
                                            }}
                                        >
                                            {item.customer_contact}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    ) : (
                        <Text
                            style={{
                                textAlign: 'center',
                                marginTop: 20,
                                fontSize: 16,
                                color: 'grey',
                            }}
                        >
                            No results found
                        </Text>
                    )}
                </View>
            </View>
        </View>
    );
};
export default TotalCustomer;