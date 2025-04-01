/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, { useEffect, useState, useRef } from 'react';
import { View, FlatList, Image, Dimensions, Animated } from 'react-native';

const Slider = () => {
    const Screenwidth = Dimensions.get("window").width;
    const [activeIndex, setActiveIndex] = useState(0);
    const flatlistRef = useRef();
    const dotScale = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        // Animate dot when activeIndex changes
        Animated.timing(dotScale, {
            toValue: activeIndex,
            duration: 200,
            useNativeDriver: false,
        }).start();

        let interval = setInterval(() => {
            if (activeIndex === Data.length - 1) {
                flatlistRef.current.scrollToIndex({
                    index: 0,
                    animated: true
                });
            } else {
                flatlistRef.current.scrollToIndex({
                    index: activeIndex + 1,
                    animated: true
                });
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [activeIndex]);

    const getItemLayout = (data, index) => ({
        length: Screenwidth,
        offset: Screenwidth * index,
        index: index,
    });

    const Data = [
        {
            id: "1",
            image: require('../assets/SadhiEvent.png')
        },
        {
            id: "2",
            image: require('../assets/Festival.jpg')
        },
        {
            id: "3",
            image: require('../assets/CelebrationEvent.jpg')
        },
    ];

    const renderItem = ({ item }) => (
        <View>
            <Image source={item.image} style={{ width: Screenwidth, height: 200 }} />
        </View>
    );

    const Dotindicator = () => (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
            {Data.map((_, index) => {
                const scale = dotScale.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [1, 1.5, 1], // Active dot is 1.5x larger
                    extrapolate: 'clamp',
                });

                const backgroundColor = dotScale.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: ['skyblue', 'green', 'skyblue'], // Active dot is green
                    extrapolate: 'clamp',
                });

                return (
                    <Animated.View
                        key={index}
                        style={{
                            backgroundColor,
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            margin: 5,
                            transform: [{ scale }]
                        }}
                    />
                );
            })}
        </View>
    );

    const handleScroll = (event) => {
        const ScrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(ScrollPosition / Screenwidth);
        setActiveIndex(index);
    };

    return (
        <View>
            <FlatList
                data={Data}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                onScroll={handleScroll}
                keyExtractor={(item) => item.id}
                ref={flatlistRef}
                getItemLayout={getItemLayout}
            />
            {Dotindicator()}
        </View>
    );
};

export default Slider;