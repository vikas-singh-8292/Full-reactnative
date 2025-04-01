/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Slider from './Slider';

const Home = () => {
    const navigation = useNavigation();

    const Data = [
        {
            id: "1",
            image: require('../assets/BirthdayCelebration.jpg'),
            text: "Birthday Celebration"
        },
        {
            id: "2",
            image: require('../assets/WeddingCelebration.jpg'),
            text: "Marriage Celebration"
        },
        {
            id: "3",
            image: require('../assets/Concert.jpg'),
            text: "Concert"
        },
        {
            id: "4",
            image: require('../assets/BirthdayCelebration.jpg'),
            text: "Other Celebration"
        },
    ]

    const renderItem = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity>
                    <Image source={item.image} style={{ width: 120, height: 180, margin: 10, borderRadius: 15 }} />
                </TouchableOpacity>

                <Text style={{ fontSize: 15, fontFamily: 'InterSemiBold', width: 120, marginLeft: 10 }}>{item.text} </Text>

            </View>
        )
    }
    
    return (
        <View style={{ flex: 1 }}>
            <StatusBar
                animated={true}
                backgroundColor="skyblue"
                barStyle={'dark-content'}
                
            />

            <View style={{ flexDirection: 'row', backgroundColor: 'skyblue', height: 50, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <Image source={require('../assets/menu.png')} style={{ width: 25, height: 25, tintColor: '#000' }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, textAlign: 'center', color: '#000', marginLeft: '33%', fontFamily: 'interBlack' }}>
                    Home
                </Text>
                <View style={{ width: '42%' }}></View>
            </View>
            <ScrollView>
                <View style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 0, width: '80%', marginLeft: '10%', elevation: 1, borderRadius: 1, margin: 10 }}>
                    <Text style={{ fontSize: 22, fontFamily: 'interBlack' }}>Our Exciting Offers</Text>
                </View>
                <Slider />

                <View style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 0, width: '80%', marginLeft: '10%', elevation: 1, borderRadius: 1, margin: 10 }}>
                    <Text style={{ fontSize: 22, fontFamily: 'interBlack' }}>Our Services</Text>
                </View>
                <View>
                    <FlatList data={Data} renderItem={renderItem} horizontal={true}></FlatList>
                </View>
                <View style={{borderWidth:0,margin:10,elevation:1}}>

                    <View style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 0, width: '80%', marginLeft: '10%', elevation: 1, borderRadius: 1, margin: 10 }}>
                        <Text style={{ fontSize: 22, fontFamily: 'interBlack' }}>What we provide?</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../assets/back.png')} style={{ width: 20, height: 20, marginLeft: 10 }} />
                        <Text style={{ marginLeft: 10, fontSize: 15, fontFamily: 'InterSemiBold' }}>We are Provide 24*7 Service</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../assets/back.png')} style={{ width: 20, height: 20, marginLeft: 10 }} />
                        <Text style={{ marginLeft: 10, fontSize: 15, fontFamily: 'InterSemiBold' }}>We provide you complimantary cakes.</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../assets/back.png')} style={{ width: 20, height: 20, marginLeft: 10 }} />
                        <Text style={{ marginLeft: 10, fontSize: 15, fontFamily: 'InterSemiBold' }}>We provide you Cattering.</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../assets/back.png')} style={{ width: 20, height: 20, marginLeft: 10 }} />
                        <Text style={{ marginLeft: 10, fontSize: 15, fontFamily: 'InterSemiBold' }}>We provide you manpower.</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../assets/back.png')} style={{ width: 20, height: 20, marginLeft: 10 }} />
                        <Text style={{ marginLeft: 10, fontSize: 15, fontFamily: 'InterSemiBold' }}>We provide you 3 star Service.</Text>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
};

export default Home;