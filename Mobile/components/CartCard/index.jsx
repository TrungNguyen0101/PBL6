import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import colors from '../../contains/colors'

export default function CartCard({ name, quantity = 1, price, image }) {
    return (
        <View style={{ backgroundColor: colors.bgColor, flexDirection: 'row', gap: 8, padding: 6, marginBottom: 6 }}>
            <Image style={{ width: 100, height: 100 }} source={image} />
            <View style={{ gap: 4 }}>
                <Text style={{ fontSize: 24 }}>{name}</Text>
                <Text style={{ fontSize: 18 }}>${price}</Text>
                <View style={{
                    flexDirection: 'row', alignItems: 'center', gap: 8
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        < TouchableOpacity style={{ borderWidth: 1, borderColor: colors.blackColor, paddingHorizontal: 8 }}>
                            <Text style={{ fontSize: 20 }}>-</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, borderTopColor: colors.blackColor, borderTopWidth: 1, borderBottomColor: colors.blackColor, borderBottomWidth: 1, paddingHorizontal: 12 }}>{quantity}</Text>
                        <TouchableOpacity style={{ borderWidth: 1, borderColor: colors.blackColor, paddingHorizontal: 8 }}>
                            <Text style={{ fontSize: 20 }}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ paddingHorizontal: 12, backgroundColor: 'red', borderWidth: 1, borderColor: colors.blackColor }}>
                        <Text style={{ color: colors.whiteColor, fontSize: 20 }}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View >
        </View >
    )
}