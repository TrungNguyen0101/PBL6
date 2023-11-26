import { Dimensions, SafeAreaView, ScrollView, Text, View } from 'react-native'
import React from 'react'

import CheckoutCard from '../../../components/CheckoutCard'

// import img from '../../assets/Image/Cart/image.jpg'
import img from '../../../assets/Image/Cart/image.jpg'
import colors from '../../../contains/colors'

import { Entypo } from '@expo/vector-icons';

export default function ListProductCheckout() {
    const screenHeight = Dimensions.get('window').height
    return (
        <SafeAreaView style={{ flex: 1, minHeight: screenHeight * 0.36 }}>
            <View style={{ backgroundColor: colors.bgColor, paddingHorizontal: 12, flexDirection: 'row', gap: 6, alignItems: 'center', paddingVertical: 6 }}>
                <Entypo name="shopping-cart" size={24} color={colors.orangeColor} />
                <Text style={{ fontSize: 22 }}>Sản phẩm</Text>
            </View>
            <ScrollView style={{ flex: 1, backgroundColor: '#ccc', overflow: 'hidden' }}>
                <CheckoutCard image={img} quantity={1} name={"Death note"} price={100} />
                <CheckoutCard image={img} quantity={1} name={"Death note"} price={100} />
                <CheckoutCard image={img} quantity={1} name={"Death note"} price={100} />
                <CheckoutCard image={img} quantity={1} name={"Death note"} price={100} />
                <CheckoutCard image={img} quantity={1} name={"Death note"} price={100} />
                <CheckoutCard image={img} quantity={1} name={"Death note"} price={100} />
                <CheckoutCard image={img} quantity={1} name={"Death note"} price={100} />
            </ScrollView>
        </SafeAreaView >
    )
}