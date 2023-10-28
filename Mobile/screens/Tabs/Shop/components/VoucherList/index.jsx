import { Dimensions, FlatList, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

import styles from './styles'
import colors from '../../../../../contains/colors'
import VoucherItem from '../VoucherItem';
const vouchers = [
  {
    id: 1,
    name: 'Chanel',
    minDiscount: '15%',
    maxDiscount: '15k',
    img: require('../../../../../assets/Image/Brand/Chanel.jpg')
  },
  {
    id: 2,
    name: 'Starbucks',
    minDiscount: '10%',
    maxDiscount: '25k',
    img: require('../../../../../assets/Image/Brand/starbucks.jpg')
  },
  {
    id: 3,
    name: 'Nike',
    minDiscount: '50%',
    maxDiscount: '250k',
    img: require('../../../../../assets/Image/Brand/nike.jpg')
  },
  {
    id: 4,
    name: 'Calvin Klein',
    minDiscount: '20%',
    maxDiscount: '25k',
    img: require('../../../../../assets/Image/Brand/calvinKlein.jpg')
  },
]
export default function VoucherList() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.titleWrapper}>
        <Ionicons name="gift-sharp" size={24} color={colors.primaryColor} />
        <Text style={styles.title}>Mã giảm giá</Text>
      </View>
      <FlatList
        data={vouchers}
        renderItem={({ item }) =>
          <View style={{ flex: 1, marginHorizontal: 8 }}>
            <VoucherItem 
              name={item.name}
              img={item.img}
              min={item.minDiscount}
              max={item.maxDiscount}
            />
          </View>
        }
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  )
}