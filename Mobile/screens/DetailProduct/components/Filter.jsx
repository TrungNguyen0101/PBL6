/* eslint-disable react/prop-types */
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import colors from '../../../contains/colors'
import { AntDesign } from '@expo/vector-icons'
import { AuthContext } from '../../../context/AuthProvider'
import { useNavigation } from '@react-navigation/native'
import { post } from '../../../axios-config'
import { CheckoutContext } from '../../../context/CheckoutProvider'
import Toast from 'react-native-toast-message'

export default function Filter({ book }) {
  const { user, accessToken } = useContext(AuthContext)
  const { fetchCartData } = useContext(CheckoutContext)
  const navigation = useNavigation()

  const handleAddCart = async () => {
    const priceDiscount =
      book?.discount !== 0 ? (book?.price * (100 - book?.discount)) / 100 : ''
    try {
      if (user) {
        const formData = {
          IdAccount: user?._id,
          Book: book,
          PriceDiscount:
            priceDiscount !== ''
              ? priceDiscount.toFixed(2)
              : book?.price.toFixed(2),
          Count: 1,
        }
        const response = await post('/order/insert', formData, {
          headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
          },
        })
        if (response) {
          fetchCartData()
          Toast.show({
            type: 'success',
            text1: 'Thông báo',
            text2: 'Thêm sách vào giỏ hàng thành công',
          })
          return
        }
        Toast.show({
          type: 'error',
          text1: 'Thông báo',
          text2: 'Thêm sách vào giỏ hàng thất bại',
        })
        return
      } else {
        Alert.alert('Thông báo', 'Vui lòng đăng nhập', [
          {
            text: 'Đóng',
            style: 'cancel',
          },
          {
            text: 'Đăng nhập',
            onPress: () => {
              navigation.navigate('SignIn')
            },
          },
        ])
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Thông báo', 'Lỗi', [
        {
          text: 'Đóng',
          style: 'cancel',
        },
      ])
    }
  }
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity
        onPress={handleAddCart}
        style={{
          flex: 1,
          backgroundColor: colors.primaryColor,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 8,
        }}
      >
        <AntDesign name="shoppingcart" size={24} color={colors.whiteColor} />
        <Text style={{ color: colors.whiteColor, fontSize: 16 }}>
          Thêm vào giỏ hàng
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: colors.orangeColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() =>
          navigation?.navigate('Comments', { headerName: 'Đánh giá' })
        }
      >
        <Text style={{ color: colors.whiteColor, fontSize: 16 }}>Đánh giá</Text>
      </TouchableOpacity>
    </View>
  )
}
