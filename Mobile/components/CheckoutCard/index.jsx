/* eslint-disable react/prop-types */
import { Image, Text, View } from 'react-native'
import React from 'react'

import colors from '../../contains/colors'

export default function CheckoutCard({ name, quantity = 1, price, image }) {
  return (
    <View
      style={{
        backgroundColor: colors.bgColor,
        flexDirection: 'row',
        gap: 8,
        padding: 6,
        marginTop: 4,
      }}
    >
      <Image
        style={{ width: 100, height: '100%' }}
        resizeMode="cover"
        source={{ uri: image }}
      />
      <View style={{ gap: 4 }}>
        <Text style={{ fontSize: 18, maxWidth: '95%' }}>{name}</Text>
        <Text style={{ fontSize: 18, color: colors.orangeColor }}>
          ${price}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Text style={{ fontSize: 16 }}>Số lượng: </Text>
          <Text style={{ fontSize: 16 }}>{quantity}</Text>
        </View>
      </View>
    </View>
  )
}
