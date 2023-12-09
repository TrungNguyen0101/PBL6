/* eslint-disable react/prop-types */
import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'

import colors from '../../contains/colors'
import { AuthContext } from '../../context/AuthProvider'
import { del, put } from '../../axios-config'
import { CheckoutContext } from '../../context/CheckoutProvider'

export default function CartCard({
  id,
  name,
  quantity = 1,
  price,
  image,
  idOrder,
  discountPrice,
}) {
  const { user, accessToken } = useContext(AuthContext)
  const { fetchCartData } = useContext(CheckoutContext)

  const handleDelete = async () => {
    try {
      const response = await del(`/order/${idOrder}`, {
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        },
      })
      if (response) {
        fetchCartData()
        return
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeQuantity = async (status) => {
    try {
      switch (status) {
        case 'increase': {
          const formData = {
            IdAccount: user?._id,
            BookId: id,
            Count: quantity + 1,
          }
          const response = await put('/order/update', formData, {
            headers: {
              Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
            },
          })
          if (response) {
            fetchCartData()
          }
          break
        }
        case 'decrease': {
          const quantityChangeValue = quantity - 1
          if (quantityChangeValue === 0) {
            const response = await del(`/order/${idOrder}`, {
              headers: {
                Authorization: accessToken
                  ? `Bearer ${accessToken}`
                  : undefined,
              },
            })
            if (response) {
              fetchCartData()
              return
            }
          }
          const formData = {
            IdAccount: user?._id,
            BookId: id,
            Count: quantity - 1,
          }
          const response = await put('/order/update', formData, {
            headers: {
              Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
            },
          })
          if (response) {
            fetchCartData()
          }
          break
        }
        default: {
          break
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
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
              {price.toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND',
              })}
            </Text>
            <Text style={{ fontSize: 18, color: colors.orangeColor }}>
              {Number(discountPrice).toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND',
              })}
            </Text>
          </View>
        ) : (
          <Text style={{ fontSize: 18 }}>
            {price.toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}
          </Text>
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
              onPress={() => handleChangeQuantity('decrease')}
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
              onPress={() => handleChangeQuantity('increase')}
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
            onPress={handleDelete}
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
