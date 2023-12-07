import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native'
import React, { useContext } from 'react'

import CheckoutCard from '../../../components/CheckoutCard'

// import img from '../../assets/Image/Cart/image.jpg'
import colors from '../../../contains/colors'

import { Entypo } from '@expo/vector-icons'
import { CheckoutContext } from '../../../context/CheckoutProvider'

export default function ListProductCheckout() {
  const screenHeight = Dimensions.get('window').height
  const { cart } = useContext(CheckoutContext)

  return (
    <SafeAreaView style={{ flex: 1, minHeight: screenHeight * 0.36 }}>
      <View
        style={{
          backgroundColor: colors.bgColor,
          paddingHorizontal: 12,
          flexDirection: 'row',
          gap: 6,
          alignItems: 'center',
          paddingVertical: 6,
        }}
      >
        <Entypo name="shopping-cart" size={24} color={colors.orangeColor} />
        <Text style={{ fontSize: 22 }}>Sản phẩm</Text>
      </View>
      <ScrollView
        style={{ flex: 1, backgroundColor: '#ccc', overflow: 'hidden' }}
      >
        {cart ? (
          cart?.map((book) => (
            <CheckoutCard
              key={book?._id}
              image={book?.Book?.mainImage[0]?.url}
              quantity={book?.Count}
              name={book?.Book?.booktitle}
              price={book?.PriceDiscount}
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
  )
}
