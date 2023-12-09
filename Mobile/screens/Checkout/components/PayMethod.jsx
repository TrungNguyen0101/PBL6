import { Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'

import colors from '../../../contains/colors'
import { useNavigation } from '@react-navigation/native'

import { FontAwesome } from '@expo/vector-icons'
import { CheckoutContext } from '../../../context/CheckoutProvider'

export default function PayMethod() {
  const { shipMethod } = useContext(CheckoutContext)
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => navigation?.navigate('PaymentMethod', { headerName: 'Phương thức thanh toán' })}
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
      <Text style={{ fontSize: 16, marginTop: 4 }}>
        {shipMethod?.label}
      </Text>
    </TouchableOpacity>
  )
}
