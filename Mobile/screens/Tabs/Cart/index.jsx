import { Dimensions, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../../contains/colors'
import CartCard from '../../../components/CartCard'

import img from '../../../assets/Image/Cart/image.jpg'
import { useNavigation } from '@react-navigation/native'

export default function Cart() {
  const navigation = useNavigation()
  const screenHeight = Dimensions.get('window').height
  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', backgroundColor: colors.whiteColor, paddingTop: 40, paddingBottom: 12, elevation: 8 }}>
        <Text style={{ fontSize: 20, color: colors.blackColor }}>Cart</Text>
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, minHeight: screenHeight * 0.7, backgroundColor: '#ccc' }}>
          <CartCard image={img} quantity={1} name={"Death note"} price={100} />
          <CartCard image={img} quantity={1} name={"Death note"} price={100} />
          <CartCard image={img} quantity={1} name={"Death note"} price={100} />
          <CartCard image={img} quantity={1} name={"Death note"} price={100} />
          <CartCard image={img} quantity={1} name={"Death note"} price={100} />
          <CartCard image={img} quantity={1} name={"Death note"} price={100} />
          <CartCard image={img} quantity={1} name={"Death note"} price={100} />
        </ScrollView>
      </SafeAreaView >
      <View style={{ flexDirection: 'row', bottom: 0, elevation: 4 }}>
        <View style={{ flex: 2, backgroundColor: colors.whiteColor, alignItems: 'flex-end', paddingHorizontal: 12, paddingVertical: 12 }}>
          <Text style={{ fontSize: 16 }}>Tổng thanh toán: </Text>
          <Text style={{ fontSize: 16, color: colors.orangeColor, fontWeight: 'bold' }}>$100</Text>
        </View>
        <TouchableOpacity onPress={() => { navigation.navigate('Checkout') }} style={{ flex: 1, backgroundColor: colors.orangeColor, alignItems: 'center', justifyContent: 'center', paddingVertical: 12 }}>
          <Text style={{ fontSize: 18, color: colors.whiteColor }}>Mua hàng</Text>
        </TouchableOpacity>
      </View>
    </View >
  )
}