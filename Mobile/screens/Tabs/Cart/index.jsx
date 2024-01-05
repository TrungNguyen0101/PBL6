import {
  ActivityIndicator,
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useContext, useEffect } from 'react'
import colors from '../../../contains/colors'
import CartCard from '../../../components/CartCard'

import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../../context/AuthProvider'
import { CheckoutContext } from '../../../context/CheckoutProvider'

export default function Cart() {
  const navigation = useNavigation()
  const screenHeight = Dimensions.get('window').height
  const { user } = useContext(AuthContext)
  const { cart, totalPrice, fetchCartData } = useContext(CheckoutContext)

  useEffect(() => {
    fetchCartData()
  }, [fetchCartData])

  useEffect(() => {
    if (!user) {
      Alert.alert('Thông báo', 'Bạn cần phải đăng nhập', [
        {
          text: 'Đăng nhập',
          onPress: () => {
            navigation.navigate('SignIn')
          },
        },
      ])
    }
  }, [navigation, user])

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: colors.whiteColor,
          paddingTop: 40,
          paddingBottom: 12,
          elevation: 8,
        }}
      >
        <Text style={{ fontSize: 20, color: colors.blackColor }}>Cart</Text>
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{
            flex: 1,
            minHeight: screenHeight * 0.7,
            backgroundColor: '#ccc',
            paddingHorizontal: 4,
          }}
        >
          {cart ? (
            cart?.map((book) => (
              <CartCard
                key={book?._id}
                idOrder={book?._id}
                id={book?.Book?._id}
                image={book?.Book?.mainImage[0]?.url}
                quantity={book?.Count}
                name={book?.Book?.booktitle}
                price={book?.Book?.price}
                discount={book?.Book?.discount}
              />
            ))
          ) : (
            <View
              style={{
                flex: 1,
                minHeight: screenHeight * 0.7,
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              <ActivityIndicator size="large" color={colors.primaryColor} />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
      {user && (
        <View style={{ flexDirection: 'row', bottom: 0, elevation: 4 }}>
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
              {totalPrice.toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND',
              })}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Checkout')
            }}
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
      )}
    </View>
  )
}
