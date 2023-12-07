import { Dimensions, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import colors from '../../contains/colors'

import Address from './components/Address'
import ListProductCheckout from './components/ListProductCheckout'
import Description from './components/Description'
import { useNavigation } from '@react-navigation/native'
import { CheckoutContext } from '../../context/CheckoutProvider'

export default function Cart() {
  const screenHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const { shipPrice, totalPrice } = useContext(CheckoutContext)

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
      <Address name={'Phan Hoàng Quốc Tú'} address={'186 Phan Đình Phùng'} />
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
            ${shipPrice + totalPrice}
          </Text>
        </View>
        <TouchableOpacity
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
