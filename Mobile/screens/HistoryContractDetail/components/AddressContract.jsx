/* eslint-disable react/prop-types */
import { Text, View } from 'react-native'
import React from 'react'

import { Entypo } from '@expo/vector-icons'

import colors from '../../../contains/colors'

export default function AddressContract({ name, phone, address }) {
  return (
    <View
      style={{
        marginVertical: 8,
        paddingVertical: 4,
        backgroundColor: colors.bgColor,
        flexDirection: 'row',
        gap: 8,
      }}
    >
      <Entypo name="location-pin" size={28} color={colors.orangeColor} />
      <View>
        <Text style={{ fontSize: 22 }}>Địa chỉ nhận hàng</Text>
        <Text style={{ fontSize: 16 }}>{name}</Text>
        <Text style={{ fontSize: 16 }}>{phone}</Text>
        <Text style={{ fontSize: 16 }}>{address}</Text>
      </View>
    </View>
  )
}
