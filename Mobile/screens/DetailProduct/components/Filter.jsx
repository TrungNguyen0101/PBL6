import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../../contains/colors'
import { AntDesign } from '@expo/vector-icons';

export default function Filter() {
    return (
        <View style={{ flexDirection: 'row', }}>
            <TouchableOpacity style={{
                flex: 1, backgroundColor: colors.primaryColor, alignItems: 'center', justifyContent: 'center', paddingVertical: 8
            }}>
                <AntDesign name="shoppingcart" size={24} color={colors.whiteColor
                } />
                <Text style={{ color: colors.whiteColor, fontSize: 16 }}>Thêm vào giỏ hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, backgroundColor: colors.orangeColor, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: colors.whiteColor, fontSize: 16 }}>Mua ngay</Text>
            </TouchableOpacity>
        </View>
    )
}