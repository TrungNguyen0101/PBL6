/* eslint-disable react/prop-types */
import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { Entypo } from '@expo/vector-icons'

import colors from '../../../contains/colors'
import { useNavigation } from '@react-navigation/native'

export default function Address({ name, phone, address }) {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() =>
        navigation?.navigate('PaymentAddress', {
          headerName: 'Địa chỉ nhận hàng',
        })
      }
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
    </TouchableOpacity>
  )
}
