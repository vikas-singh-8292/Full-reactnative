/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const SplashScreen = () => {

    const navigation =useNavigation();
    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate('Home');
        },2000);
    },[])
    return (
        <View style={{ backgroundColor: 'skyblue', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <StatusBar
                        animated={true}
                        backgroundColor="skyblue"
                        
                    />
            <Animatable.View style={{ backgroundColor: 'white', width: 50, height: 50, borderRadius: 25 }} duration={2000} animation="fadeInDownBig">

            </Animatable.View>
            <Animatable.View style={{ borderWidth: 4, width: '90%', alignItems: 'center', justifyContent: 'center', borderColor: 'white', borderRadius: 20 }} duration={2000} animation="fadeInLeftBig">
                <Text style={{ color: 'white', fontSize: 40, fontFamily: 'interBlack' }}>SplashScreen</Text>
            </Animatable.View>
        </View>
    )
}

export default SplashScreen
const styles = StyleSheet.create({})