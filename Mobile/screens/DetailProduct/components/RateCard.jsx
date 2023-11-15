import { Image, Text, View } from 'react-native'
import React from 'react'

import avatar from '../../../assets/Image/Profile/avatar.jpg'

export default function RateCard({ image, name, rate }) {
    return (
        <View style={{ marginVertical: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                {/* <Image style={{ flex: 1, width: screenWitdh }} resizeMode="center" source={{ uri: productDetail?.image }} /> */}
                <Image style={{ width: 40, height: 40, borderRadius: 50 }} source={avatar} />
                <Text style={{ fontSize: 18, fontWeight: '600' }}>{name}</Text>
            </View>
            <View style={{ marginTop: 12 }}>
                <Text style={{ fontSize: 16 }}>{rate}</Text>
            </View>
        </View>
    )
}