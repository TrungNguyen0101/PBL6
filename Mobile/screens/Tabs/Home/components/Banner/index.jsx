import React, { useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { ProductContext } from '../../../../../context/ProductProvider';
import { useNavigation } from '@react-navigation/native';

export default function Banner() {
    const flatListRef = useRef()
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height
    const [activeIndex, setActiveIndex] = useState(0);
    const { products, setProductId } = useContext(ProductContext);
    const navigation = useNavigation()

    useEffect(() => {
        const autoScroll = setInterval(() => {
            if (activeIndex === 3) {
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

    const renderBanner = ({ item }) => {
        return (
            <View>
                <Image source={{ uri: item?.mainImage[0]?.url }} style={{ height: '100%', width: screenWidth }} />
                <View style={styles.descriptionWrapper}>
                    <Text style={styles.descriptionName}>Tên sách: {item?.booktitle}</Text>
                    <Text style={styles.descriptionCategory}>Thể loại: {item?.category}</Text>
                    <Text style={styles.descriptionText} numberOfLines={3}>Mô tả: "{item?.desc}"</Text>
                    <TouchableOpacity onPress={() => {
                        setProductId(item?._id)
                        navigation?.navigate('DetailProduct')
                    }}>
                        <Text style={styles.detailBtn}>Watch now</Text>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }

    const handleScroll = (event) => {
        setActiveIndex(Math.round(event.nativeEvent.contentOffset.x / screenWidth))
    }

    const dotIndicator = products.map((dot, index) => {
        if (index < 4) {
            return (
                <View
                    key={index}
                    style={index === activeIndex ? styles.dotActive : styles.dotNonActive}
                />
            )
        }
        return;
    });

    return (
        <View style={{ height: screenHeight * 0.90 - 56 }}>
            <FlatList
                ref={flatListRef}
                data={products}
                renderItem={renderBanner}
                horizontal
                pagingEnabled
                onScroll={handleScroll}
                keyExtractor={(item) => item?._id}
                getItemLayout={getItemLayout}
                style={{ height: '80%' }}
            />
            <View style={styles.dotWrapper}>
                {dotIndicator}
            </View>
        </View>
    )
}
