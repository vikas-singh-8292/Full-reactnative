/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RecentSlider from './RecentSlider';

const About = () => {
    const navigation = useNavigation();
    const width = Dimensions.get("window").width;
    return (
        <View>
            <View style={{ flexDirection: 'row', backgroundColor: 'skyblue', height: 50, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <Image source={require('../assets/menu.png')} style={{ width: 25, height: 25, tintColor: '#000' }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, textAlign: 'center', color: '#000', marginLeft: '33%', fontFamily: 'interBlack' }}>
                    About
                </Text>
                <View style={{ width: '42%' }}></View>
            </View>
            <ScrollView style={{ marginBottom: '20%' }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', width: '90%', marginLeft: "5%" }}>
                    <Text style={{ fontSize: 20, fontFamily: 'InterSemiBold' }}>Welcome to Akka Event Management, the innovative Event Management designed to Celebrate your special days with Our company.</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 27, marginLeft: 15, fontFamily: 'interBlack', color: 'skyblue' }}>Our Recent Events</Text>
                </View>
                <RecentSlider/>

                <View style={{ width: '90%', marginLeft: '5%' }}>
                    <View>
                        <Text style={{ fontSize: 27, fontFamily: 'interBlack', color: 'skyblue' }}>Our Services</Text>
                    </View>
                    <View style={{ width: '100%', borderWidth: 0, borderRadius: 1 }}>
                        <Text style={{ fontSize: 18, fontFamily: 'InterSemiBold' }}>Wedding Planning:</Text>
                        <Text style={{ fontSize: 15, fontFamily: 'InterMedium' }}>From venue selection to the final dance, we handle every aspect of your special day.</Text>

                        <Text style={{ fontSize: 18, fontFamily: 'InterSemiBold' }}>corporate Event:</Text>
                        <Text style={{ fontSize: 15, fontFamily: 'InterMedium' }}>Professional and seamless Planning for conferences.product lunches, and corporate retreats.</Text>

                        <Text style={{ fontSize: 18, fontFamily: 'InterSemiBold' }}>Social Events:</Text>
                        <Text style={{ fontSize: 15, fontFamily: 'InterMedium' }}>Birthdays ,anniversaries, and parties - we creat joyous and memorable moments</Text>

                        <Text style={{ fontSize: 18, fontFamily: 'InterSemiBold' }}>Themed Events:</Text>
                        <Text style={{ fontSize: 15, fontFamily: 'InterMedium' }}>Custom themes and creative concepts to make your event stand out.</Text>

                        <Text style={{ fontSize: 18, fontFamily: 'InterSemiBold' }}>Event Production:</Text>
                        <Text style={{ fontSize: 15, fontFamily: 'InterMedium' }}>Full-Service production including audio-visual,lighting and staging.</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default About
