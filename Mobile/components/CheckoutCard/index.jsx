import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import colors from '../../contains/colors'

export default function CheckoutCard({ name, quantity = 1, price, image }) {
    return (
        <View style={{ backgroundColor: colors.bgColor, flexDirection: 'row', gap: 8, padding: 6, marginBottom: 6 }}>
            <Image style={{ width: 100, height: 100 }} source={image} />
            <View style={{ gap: 4 }}>
                <Text style={{ fontSize: 24 }}>{name}</Text>
                <Text style={{ fontSize: 18 }}>${price}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Text style={{ fontSize: 18 }}>Số lượng: </Text>
                    <Text style={{ fontSize: 18 }}>{quantity}</Text>
                </View>
            </View >
        </View >
    )
}