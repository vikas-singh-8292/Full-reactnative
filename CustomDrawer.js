/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */

import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const CustomDrawer = () => {
    const navigation = useNavigation();
    const loginButtonRef = useRef(null);

    // Safely get the current route name
    const currentRoute = useNavigationState((state) =>
        state?.routes && state.routes.length > 0 ? state.routes[state.index]?.name : null
    );

    const getContainerStyle = (routeName) => ({
        width: '100%',
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: currentRoute === routeName ? 0 : 0,
        borderColor: currentRoute === routeName ? 'gray' : 'transparent',
        backgroundColor: currentRoute === routeName ? 'skyblue' : 'transparent',
        borderRadius: 20,
        paddingHorizontal: 5,
        marginBottom: 10,
    });

    const getTextStyle = (routeName) => ({
        fontSize: 18,
        color: currentRoute === routeName ? 'white' : 'black',
    });
    const handleLoginPress = () => {
        // Trigger the animation
        if (loginButtonRef.current) {
            loginButtonRef.current.bounce(800).then(() => {
                // Navigate to the Login screen after the animation
                navigation.navigate('Login');
            });
        }
    };

    const getIconTint = (routeName) => (currentRoute === routeName ? 'white' : 'black');

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1, flexDirection: 'column', marginTop: 90, marginLeft: 30 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <View style={getContainerStyle('Home')}>
                        <Image
                            source={require('../assets/myhome.png')}
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: getIconTint('Home'),
                            }}
                        />
                        <View style={{ marginLeft: 25 }}>
                            <Text style={getTextStyle('Home')}>Home</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('About')}>
                    <View style={getContainerStyle('About')}>
                        <Image
                            source={require('../assets/About.png')}
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: getIconTint('About'),
                                
                            }}
                        />
                        <View style={{ marginLeft: 25 }}>
                            <Text style={{ ...getTextStyle('About'), marginLeft: 5, }}>
                                About
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
                    <View style={getContainerStyle('Contact')}>
                        <Image
                            source={require('../assets/Contact.png')}
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: getIconTint('Contact'),
                                
                            }}
                        />
                        <View style={{ marginLeft: 25 }}>
                            <Text style={{ ...getTextStyle('Contact'), marginLeft: 5, }}>
                                Contact
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Gallery')}>
                    <View style={getContainerStyle('Gallery')}>
                        <Image
                            source={require('../assets/Gallery.png')}
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: getIconTint('Gallery'),
                                
                            }}
                        />
                        <View style={{ marginLeft: 25 }}>
                            <Text style={{ ...getTextStyle('Gallery'), marginLeft: 5, }}>
                                Gallery
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <Animatable.View ref={loginButtonRef}>
                    <TouchableOpacity
                        style={{
                            width: '60%',
                            backgroundColor: 'skyblue',
                            height: 45,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10,
                            marginTop: 15,
                            flexDirection: 'row',
                        }}
                        onPress={handleLoginPress}
                    >
                        <Image
                            source={require('../assets/Login.png')}
                            style={{
                                width: 25,
                                height: 24,
                                marginRight: 20,
                                tintColor: '#000',
                            }}
                        ></Image>
                        <Text
                            style={{
                                fontSize: 18,
                                fontFamily: 'interBlack',
                                color: '#000',
                                marginRight: 20,
                            }}
                        >
                            Login
                        </Text>
                    </TouchableOpacity>
                </Animatable.View>
            </View>
        </ScrollView>
    );
};
export default CustomDrawer;