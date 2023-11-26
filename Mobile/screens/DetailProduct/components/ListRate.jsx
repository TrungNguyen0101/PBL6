import { Image, Text, View } from 'react-native'
import React from 'react'
import colors from '../../../contains/colors'

import RateCard from './RateCard'

export default function ListRate() {
    return (
        <View style={{ paddingHorizontal: 12 }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                marginBottom: 12,
                paddingBottom: 8,
                borderBottomColor: colors.blackColor,
                borderBottomWidth: 2,
            }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Đánh giá sản phẩm</Text>
            </View>
            <View>
                <RateCard name={"Huy yeu Anh"} rate={"Sản phẩm có tốt hay không thì không biết nhưng Huy rất yêu Anh"} />
                <RateCard name={"Huy yeu Anh"} rate={"Sản phẩm có tốt hay không thì không biết nhưng Huy rất yêu Anh"} />
                <RateCard name={"Huy yeu Anh"} rate={"Sản phẩm có tốt hay không thì không biết nhưng Huy rất yêu Anh"} />
            </View>
        </View>
    )
}