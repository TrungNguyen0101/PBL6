import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, Text, View } from 'react-native';
import styles from './styles';

const images = [
    {
        id: 1,
        img: require('../../../../../assets/Image/Home/banner1.jpg')
    },
    {
        id: 2,
        img: require('../../../../../assets/Image/Home/banner2.jpg')
    },
    {
        id: 3,
        img: require('../../../../../assets/Image/Home/banner3.jpg')
    },
    {
        id: 4,
        img: require('../../../../../assets/Image/Home/banner4.jpg')
    },
];

export default function Banner() {
    const flatListRef = useRef()
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const autoScroll = setInterval(() => {
            if (activeIndex === images.length - 1) {
                flatListRef?.current?.scrollToIndex({
                    index: 0,
                    animated: true
                })
            } else {
                flatListRef?.current?.scrollToIndex({
                    index: activeIndex + 1,
                    animated: true
                })
            }
        }, 2000)
        return () => {
            clearInterval(autoScroll);
        };
    }, [activeIndex]);

    const getItemLayout = (data, index) => ({
        length: screenWidth,
        offset: screenWidth * index,
        index: index
    })

    const renderBanner = ({ item }) => (
        <View>
            <Image source={item.img} style={{ height: '100%', width: screenWidth }} />
        </View>
    )

    const handleScroll = (event) => {
        setActiveIndex(Math.round(event.nativeEvent.contentOffset.x / screenWidth))
    }

    const dotIndicator = images.map((dot, index) => (
        <View
            key={index}
            style={index === activeIndex ? styles.dotActive : styles.dotNonActive}
        />
    ));

    return (
        <View style={{ height: screenHeight * 0.84 - 56 }}>
            <FlatList
                ref={flatListRef}
                data={images}
                renderItem={renderBanner}
                horizontal
                pagingEnabled
                onScroll={handleScroll}
                keyExtractor={(item) => item.id.toString()}
                getItemLayout={getItemLayout}
                style={{ height: '80%' }}
            />
            <View style={styles.dotWrapper}>
                {dotIndicator}
            </View>
        </View>
    )
}
