/* eslint-disable react/prop-types */
import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import colors from '../../contains/colors'

export default function CartCard({
  name,
  quantity = 1,
  price,
  image,
  discountPrice,
}) {
  return (
    <View
      style={{
        backgroundColor: colors.bgColor,
        flexDirection: 'row',
        gap: 8,
        padding: 6,
        marginVertical: 4,
      }}
    >
      <Image style={{ width: 100, height: '100%' }} source={{ uri: image }} />
      <View style={{ gap: 4 }}>
        <Text style={{ fontSize: 20, maxWidth: '90%' }}>{name}</Text>
        {discountPrice ? (
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Text
              style={{
                fontSize: 18,
                textDecorationLine: 'line-through',
                color: '#000',
                opacity: 0.7,
              }}
            >
              ${price}
            </Text>
            <Text style={{ fontSize: 18, color: colors.orangeColor }}>
              ${discountPrice}
            </Text>
          </View>
        ) : (
          <Text style={{ fontSize: 18 }}>${price}</Text>
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: colors.blackColor,
                paddingHorizontal: 8,
              }}
            >
              <Text style={{ fontSize: 20 }}>-</Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                borderTopColor: colors.blackColor,
                borderTopWidth: 1,
                borderBottomColor: colors.blackColor,
                borderBottomWidth: 1,
                paddingHorizontal: 12,
              }}
            >
              {quantity}
            </Text>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: colors.blackColor,
                paddingHorizontal: 8,
              }}
            >
              <Text style={{ fontSize: 20 }}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              paddingHorizontal: 24,
              paddingVertical: 2,
              backgroundColor: colors?.orangeColor,
              borderWidth: 1,
              borderColor: colors.blackColor,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: colors.whiteColor, fontSize: 20 }}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
