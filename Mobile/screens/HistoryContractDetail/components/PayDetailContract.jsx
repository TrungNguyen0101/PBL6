/* eslint-disable react/prop-types */
import { Text, View } from 'react-native'
import React, { useContext } from 'react'
import colors from '../../../contains/colors'

import { FontAwesome5 } from '@expo/vector-icons'
import { CheckoutContext } from '../../../context/CheckoutProvider'

export default function PayDetailContract({ data }) {
  const { shipPrice } = useContext(CheckoutContext)

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
        <FontAwesome5
          name="money-bill-alt"
          size={24}
          color={colors.orangeColor}
        />
        <Text style={{ fontSize: 22 }}>Chi tiết thanh toán</Text>
      </View>
      <View
        style={{
          marginTop: 4,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontSize: 16 }}>Tổng tiền hàng</Text>
        <Text style={{ fontSize: 16 }}>{Number(data?.totalmoney).toLocaleString('it-IT', {
          style: 'currency',
          currency: 'VND',
        })}</Text>
      </View>
      <View
        style={{
          marginTop: 4,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontSize: 16 }}>Tổng tiền phí vận chuyển</Text>
        <Text style={{ fontSize: 16 }}>{shipPrice.toLocaleString('it-IT', {
          style: 'currency',
          currency: 'VND',
        })}</Text>
      </View>
      <View
        style={{
          marginTop: 4,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontSize: 20 }}>Tổng thanh toán</Text>
        <Text style={{ fontSize: 20, color: colors.orangeColor }}>
          {Number(data?.totalmoney).toLocaleString('it-IT', {
            style: 'currency',
            currency: 'VND',
          })}
        </Text>
      </View>
    </View>
  )
}
