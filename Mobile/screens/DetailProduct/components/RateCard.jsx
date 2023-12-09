/* eslint-disable react/prop-types */
import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'

import avatar from '../../../assets/Image/Profile/AVATAR_DEFAULT.png'
import { format } from 'date-fns'
import colors from '../../../contains/colors'
import { FontAwesome } from '@expo/vector-icons'
import { AuthContext } from '../../../context/AuthProvider'
import { del } from '../../../axios-config'
import Toast from 'react-native-toast-message'
import { ProductContext } from '../../../context/ProductProvider'

export default function RateCard({
  userId,
  id,
  image,
  name,
  comment,
  createdAt,
}) {
  const { user, accessToken } = useContext(AuthContext)
  const { fetchCommentsProductData, detailProduct } = useContext(ProductContext)
  const handleDeleteComment = async () => {
    try {
      const response = await del(`/book/comments/${id}/delete`, {
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        },
      },)
      if (response) {
        Toast?.show({
          type: 'success',
          text1: 'Thông báo',
          text2: 'Đã xóa đánh giá thành công',
        })
        fetchCommentsProductData(detailProduct?._id)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View
      style={{
        marginVertical: 8,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: colors?.whiteColor,
      }}
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
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text>{format(new Date(createdAt), 'dd/mm/yyyy hh:mm')}</Text>
          {userId === user?._id && user ? (
            <TouchableOpacity
              onPress={handleDeleteComment}
              style={{
                borderRadius: 50,
                padding: 4,
                borderWidth: 1,
                borderColor: colors.blackColor,
              }}
            >
              <FontAwesome name="trash-o" size={24} color="black" />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      </View>
      <View style={{ marginTop: 12 }}>
        <Text style={{ fontSize: 16 }}>{comment}</Text>
      </View>
    </View>
  )
}
