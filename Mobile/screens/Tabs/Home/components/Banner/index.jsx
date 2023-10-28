import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
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
            <View style={styles.descriptionWrapper}>
                <Text style={styles.descriptionName}>Tên sách: Cô gái năm ấy tôi từng theo đuổi</Text>
                <Text style={styles.descriptionCategory}>Thể loại: Tình yêu</Text>
                <Text style={styles.descriptionText} numberOfLines={3}>Mô tả: "Cô gái năm ấy tôi từng theo theo đuổi" kể về câu chuyện tình ngọt ngào, ngốc nghếch của cậu sinh viên - Kha Cảnh Đằng và Thẩm Giai Nghi. Chuyện tình thời sinh viên ngây thơ, chân thành nhưng cũng đầy nuối tiếc của họ sẽ mang đọc giả về với những ngày tháng hồn nhiên nhất của cuộc đời, cảm nhận sâu sắc hơn tình yêu, có hạnh phúc và cũng có nhiều lưu luyến.</Text>
                <TouchableOpacity>
                    <Text style={styles.detailBtn}>Watch now</Text>
                </TouchableOpacity>
            </View>
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
