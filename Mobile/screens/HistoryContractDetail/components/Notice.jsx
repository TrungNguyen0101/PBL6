import { Text, View } from 'react-native'
import React from 'react'
import colors from '../../../contains/colors'

import { Entypo } from '@expo/vector-icons'

export default function Notice() {
  return (
    <View
      style={{
        backgroundColor: colors.bgColor,
        marginTop: 8,
        paddingVertical: 8,
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <Entypo name="news" size={24} color={colors.orangeColor} />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <Text style={{ fontSize: 16, textAlign: 'justify' }}>
            {'"Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo'}
          </Text>
          <Text style={{ fontSize: 16, color: 'blue' }}>
            điều khoản của NTHDV
          </Text>
        </View>
      </View>
    </View>
  )
}
