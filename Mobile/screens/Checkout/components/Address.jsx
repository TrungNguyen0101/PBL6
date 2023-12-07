/* eslint-disable react/prop-types */
import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { Entypo } from '@expo/vector-icons'

import colors from '../../../contains/colors'

export default function Address({ name, address, precinct, urban, city }) {
  return (
    <TouchableOpacity
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
        <Text style={{ fontSize: 16 }}>{address}</Text>
        {precinct && urban && city ? (
          <Text
            style={{ fontSize: 16 }}
          >{`phường ${precinct}, quận ${urban}, ${city}`}</Text>
        ) : (
          ''
        )}
      </View>
    </TouchableOpacity>
  )
}
