/* eslint-disable react/prop-types */
import { Text, View } from 'react-native'
import React from 'react'

import colors from '../../../contains/colors'

import { FontAwesome } from '@expo/vector-icons'

export default function PayMethodContract({ data }) {
  return (
    <View
      style={{
        backgroundColor: colors.bgColor,
        marginTop: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <FontAwesome name="credit-card" size={24} color={colors.orangeColor} />
        <Text style={{ fontSize: 22 }}>Phương thức thanh toán</Text>
      </View>
      <Text style={{ fontSize: 16, marginTop: 4 }}>{data?.payment_method === "OFF" ? "Thanh toán khi nhận hàng" : "Thanh toán qua cổng VNPAY"}</Text>
    </View>
  )
}
