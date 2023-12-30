import { Alert, Dimensions, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import colors from '../../contains/colors'

import Address from './components/Address'
import ListProductCheckout from './components/ListProductCheckout'
import Description from './components/Description'
import { useNavigation } from '@react-navigation/native'
import { CheckoutContext } from '../../context/CheckoutProvider'
import { AuthContext } from '../../context/AuthProvider'
import { post, put } from '../../axios-config'
import Toast from 'react-native-toast-message'

export default function Checkout() {
  const screenHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const {
    shipPrice,
    totalPrice,
    addressCheckout,
    cart,
    shipMethod,
    fetchCartData,
  } = useContext(CheckoutContext)
  const { user, accessToken } = useContext(AuthContext)
  const handlePay = async () => {
    try {
      if (!user?.isVerified) {
        Alert.alert('Thông báo', 'Tài khoản của bạn chưa xác thực', [
          {
            text: 'Đóng',
            style: 'cancel',
          },
          {
            text: 'Xác thực',
            onPress: () => navigation.navigate('Profile'),
          },
        ])
        return
      }
      if (
        !addressCheckout?.name ||
        !addressCheckout?.address ||
        !addressCheckout?.phone
      ) {
        Toast?.show({
          type: 'error',
          text1: 'Thông báo',
          text2: 'Bạn chưa nhập thông tin nhận hàng',
        })
        return
      }
      if (shipMethod.value === 'vnpay') {
        const newCartData = cart?.map((x) => {
          return {
            ...x.Book,
            Count: x.Count,
          }
        })
        cart.map(async (x) => {
          const updateResponse = await put(
            '/order/update-status-payment',
            {
              id: x._id,
            },
            {
              headers: {
                Authorization: accessToken
                  ? `Bearer ${accessToken}`
                  : undefined,
              },
            },
          )
          if (updateResponse) {
            fetchCartData()
          }
        })
        const formData = {
          amount: Number(totalPrice + shipPrice),
          phone: addressCheckout?.phone,
          address: addressCheckout?.address,
          bankCode: '',
          language: 'vn',
          cart: newCartData,
        }
        const response = await post('/payment/create_payment_url', formData, {
          headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
          },
        })
        if (response) {
          const urlPayment = response?.data?.data
          navigation.navigate('WebViewScreen', { url: urlPayment })
        }
      }
      if (shipMethod.value === 'cash') {
        const newCartData = cart?.map((x) => {
          return {
            ...x.Book,
            Count: x.Count,
          }
        })
        cart.map(async (x) => {
          const updateResponse = await put(
            '/order/update-status-payment',
            {
              id: x._id,
            },
            {
              headers: {
                Authorization: accessToken
                  ? `Bearer ${accessToken}`
                  : undefined,
              },
            },
          )
          if (updateResponse) {
            fetchCartData()
          }
        })
        const formData = {
          totalmoney: Number(totalPrice + shipPrice),
          phone: addressCheckout?.phone,
          address: addressCheckout?.address,
          name: addressCheckout?.name,
          cart: newCartData,
        }
        const response = await post('/payment/payment_direct', formData, {
          headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
          },
        })
        if (response) {
          Toast.show({
            type: 'success',
            text1: 'Thông báo',
            text2: 'Đặt hàng thành công',
          })
          navigation.navigate('Home')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View style={{ flex: 1, minHeight: screenHeight }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Cart')}
        style={{
          position: 'absolute',
          zIndex: 99999999999,
          marginTop: 46,
          marginLeft: 24,
        }}
      >
        <Text style={{ fontSize: 16 }}>Trở lại</Text>
      </TouchableOpacity>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: colors.whiteColor,
          paddingTop: 40,
          paddingBottom: 12,
          elevation: 8,
        }}
      >
        <Text style={{ fontSize: 20, color: colors.blackColor }}>Checkout</Text>
      </View>
      <Address
        name={addressCheckout?.name}
        phone={addressCheckout?.phone}
        address={addressCheckout?.address}
      />
      <ListProductCheckout />
      <Description />
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          bottom: 0,
          elevation: 4,
          zIndex: 99999999,
        }}
      >
        <View
          style={{
            flex: 2,
            backgroundColor: colors.whiteColor,
            alignItems: 'flex-end',
            paddingHorizontal: 12,
            paddingVertical: 12,
          }}
        >
          <Text style={{ fontSize: 16 }}>Tổng thanh toán: </Text>
          <Text
            style={{
              fontSize: 16,
              color: colors.orangeColor,
              fontWeight: 'bold',
            }}
          >
            {Number(shipPrice + totalPrice).toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handlePay}
          style={{
            flex: 1,
            backgroundColor: colors.orangeColor,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
          }}
        >
          <Text style={{ fontSize: 18, color: colors.whiteColor }}>
            Mua hàng
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
