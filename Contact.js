/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Contact = () => {
    const navigation = useNavigation();
    return (
        <View>
            <View style={{ flexDirection: 'row', backgroundColor: 'skyblue', height: 50, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <Image source={require('../assets/menu.png')} style={{ width: 25, height: 25, tintColor: '#000' }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, textAlign: 'center', color: '#000', marginLeft: '30%', fontFamily: 'interBlack' }}>
                    Contact
                </Text>
                <View style={{ width: '39%' }}></View>
            </View>
            <View>
                <View style={{ width: '90%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 30, fontFamily: 'interBlack', color: 'skyblue' }}>How TO FIND US?</Text>
                </View>
                <View style={{ width: '80%', height: 250, backgroundColor: '#fff', marginLeft: '10%', marginTop: '10%', borderRadius: 10, elevation: 5 }}>
                    <View style={{ width: '80%', alignItems: 'center', marginLeft: '10%', marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', borderBottomWidth: 1, marginTop: 15, }}>
                            <Image source={require('../assets/Location.png')} style={{ width: 25, height: 25, marginRight: 5 }}></Image>
                            <Text style={{ fontSize: 15, fontFamily: 'InterMedium' }}>A-129, Agam Complex,Nr. Shiv Circle,Bharthana,Surat, Gujarat</Text>
                        </View>
                        <View style={{ flexDirection: 'row', borderBottomWidth: 1, marginTop: 15, width: '100%' }}>
                            <Image source={require('../assets/Contact.png')} style={{ width: 25, height: 25, marginRight: 5, tintColor: 'black' }}></Image>
                            <Text style={{ fontSize: 15, fontFamily: 'InterMedium' }}>+91 8128183269</Text>
                        </View>
                        <View style={{ flexDirection: 'row', borderBottomWidth: 1, marginTop: 15, width: '100%', }}>
                            <Image source={require('../assets/Email.png')} style={{ width: 25, height: 25, marginRight: 5 }}></Image>
                            <Text style={{ fontSize: 15, fontFamily: 'InterMedium' }}>AkkaEvent@gmail.com</Text>
                        </View>
                    </View>

                </View>
                <View style={{ width: '80%', marginLeft: '10%', marginTop: 20 }}>
                    <Text style={{ fontSize: 18, fontFamily: 'interBlack', color: 'skyblue' }}>You can find us on Social Media</Text>
                    <View style={{ width: '100%', height: 100, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'flex-start', marginTop: 20, borderRadius: 10, elevation: 5 }}>
                        <View style={{ flexDirection: 'row', marginLeft: 20, }}>
                            <Image source={require('../assets/instagram.png')} style={{ width: 30, height: 30, marginRight: 5, tintColor: '#f5078a' }} />
                            <Text style={{ fontSize: 17, fontFamily: 'InterMedium', marginTop: 3 }} >AkkaEventOfficialInsta</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
                            <Image source={require('../assets/facebook.png')} style={{ width: 30, height: 30, marginRight: 5, tintColor: 'skyblue' }} />
                            <Text style={{ fontSize: 17, fontFamily: 'InterMedium', marginTop: 3 }} >AkkaEventOfficialFB</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Contact
