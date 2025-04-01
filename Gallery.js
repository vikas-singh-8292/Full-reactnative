/* eslint-disable comma-dangle */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
import React from 'react'
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';

const Gallery = () => {
    const navigation = useNavigation();
    const width = Dimensions.get("window").width;
    const Data = [
        {
            id: "1",
            image: require('../assets/WeddingCelebration.jpg'),
            text: "Marriage Event"
        },
        {
            id: "2",
            image: require('../assets/Concert.jpg'),
            text: "Concert Event"
        },
        {
            id: "3",
            image: require('../assets/BirthdayCelebration.jpg'),
            text: "BirthdayCelebration Event"
        },
        {
            id: "4",
            image: require('../assets/audience.jpg'),
            text: "Audience Event"
        },
        {
            id: "5",
            image: require('../assets/corporate.jpg'),
            text: "Corporate Event"
        },
        {
            id: "6",
            image: require('../assets/Club.jpg'),
            text: "Club Event"
        },
        {
            id: "7",
            image: require('../assets/CelebrationEvent.jpg'),
            text: "Celebration Event"
        },
        {
            id: "8",
            image: require('../assets/audience.jpg'),
            text: "Audience Event"
        },
        {
            id: "9",
            image: require('../assets/Festival.jpg'),
            text: "Festival Events"
        },
        {
            id: "10",
            image: require('../assets/SadhiEvent.png'),
            text: "Marriage Event"
        },

    ]
    const renderItem = ({ item, index }) => {
        return (
            <View>
                <Image source={item.image} style={{ width: '100%', height: 200, marginBottom: 10 }} />
                <Text style={{ fontSize: 16, marginLeft: 20, fontFamily: 'InterSemiBold', color: 'skyblue' }}>{item.text} </Text>
            </View>
        )
    }
    return (
        <View>
            <View style={{ flexDirection: 'row', backgroundColor: 'skyblue', height: 50, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <Image source={require('../assets/menu.png')} style={{ width: 25, height: 25, tintColor: '#000' }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, textAlign: 'center', color: '#000', marginLeft: '31%', fontFamily: 'interBlack' }}>
                    Gallary
                </Text>
                <View style={{ width: '40%' }}></View>
            </View>
            <View style={{ marginBottom: 130 }}>
                <FlatList data={Data} renderItem={renderItem} />
            </View>

        </View>
    )
}
export default Gallery;