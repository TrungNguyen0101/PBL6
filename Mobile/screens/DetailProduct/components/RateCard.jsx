/* eslint-disable react/prop-types */
import { Image, Text, View } from 'react-native'
import React from 'react'

import avatar from '../../../assets/Image/Profile/AVATAR_DEFAULT.png'

export default function RateCard({ image, name, comment, createdAt }) {
  return (
    <View
      style={{ marginVertical: 8, borderWidth: 1, borderRadius: 8, padding: 8 }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        {/* <Image style={{ flex: 1, width: screenWitdh }} resizeMode="center" source={{ uri: productDetail?.image }} /> */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Image
            style={{ width: 40, height: 40, borderRadius: 50 }}
            source={image ? image : avatar}
          />
          <Text style={{ fontSize: 18, fontWeight: '600' }}>{name}</Text>
        </View>
        <View>
          <Text>{createdAt}</Text>
        </View>
      </View>
      <View style={{ marginTop: 12 }}>
        <Text style={{ fontSize: 16 }}>{comment}</Text>
      </View>
    </View>
  )
}
