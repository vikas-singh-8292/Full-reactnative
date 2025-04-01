/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Image, Dimensions } from 'react-native';
import { useRef } from 'react';

const RecentSlider = () => {
    const Screenwidth = Dimensions.get("window").width
    const [activeIndex, setActiveIndex] = useState(0);
    const flatlistRef=useRef();

    useEffect(()=>{

       let interval= setInterval(()=>{
            if (activeIndex === Data.length-1){
                flatlistRef.current.scrollToIndex({
                    index:0,
                    animation:true
                })
            }else{
                flatlistRef.current.scrollToIndex({
                    index: activeIndex + 1,
                    animation: true
                })
            }
        },2000)

        return()=> clearInterval(interval);

    })

    const getItemLayout =(data,index)=>({
        length:Screenwidth,
        offset:Screenwidth * index,
        index:index,
    })

    

    const Data = [
        {
            id: "1",
            image: require('../assets/audience.jpg')
        },
        {
            id: "2",
            image: require('../assets/Festival.jpg')
        },
        {
            id: "3",
            image: require('../assets/CelebrationEvent.jpg')
        },
        {
            id: "4",
            image: require('../assets/corporate.jpg')
        },
    ]
    const renderItem = ({ item, index }) => {
        return (
            <View>
                <Image source={item.image} style={{ width: Screenwidth, height: 200, }} />
            </View>

        )
    }
    const Dotindicator = () => {
        return (
            Data.map((dot, index) => {
                if (activeIndex === index) {
                    return (
                        <View style={{ backgroundColor: 'green', width: 10, height: 10, borderRadius: 5, margin: 10 }}
                            key={index}></View>
                    )
                } else {
                    return (
                        <View style={{ backgroundColor: '#f5078a', width: 10, height: 10, borderRadius: 5, margin: 10 }}
                            key={index}></View>
                    )
                }
            })
        )
    }
    console.log({Dotindicator})
    const handleScroll = (event) => {
        const ScrollPosition = event.nativeEvent.contentOffset.x;
       
        const index = ScrollPosition / Screenwidth;
        
        setActiveIndex(index)
    }
    return (
        <View>
            
            <FlatList data={Data} renderItem={renderItem} horizontal={true} pagingEnabled={true} onScroll={handleScroll}
                keyExtractor={(item) => item.id} ref={flatlistRef} getItemLayout={getItemLayout}></FlatList>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
               
            </View>
        </View>
    )
}

export default RecentSlider;
