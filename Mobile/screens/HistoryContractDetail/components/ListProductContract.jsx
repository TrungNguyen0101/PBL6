/* eslint-disable react/prop-types */
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native'
import React from 'react'

import colors from '../../../contains/colors'

import { Entypo } from '@expo/vector-icons'
import ContractCard from '../../../components/ContractCard'

export default function ListProductContract({ data }) {
  const screenHeight = Dimensions.get('window').height

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
        {data ? (
          data?.map((book) => (
            <ContractCard
              key={book?._id}
              image={book?.mainImage[0]?.url}
              quantity={book?.Count}
              name={book?.booktitle}
              price={book?.price}
              discount={book?.discount}
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
