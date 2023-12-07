import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'

import styles from '../VoucherList/styles'
import colors from '../../../../../contains/colors'
import { ProductContext } from '../../../../../context/ProductProvider'
import ProductCard from '../../../../../components/ProductCard'
export default function TrendItemList() {
  const { products, isLoading } = useContext(ProductContext)
  return (
    <View style={{ flex: 2 }}>
      <View style={styles.titleWrapper}>
        <FontAwesome5 name="fire" size={24} color={colors.primaryColor} />
        <Text style={styles.title}>Sản phẩm nổi bật</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primaryColor} />
      ) : (
        <FlatList
          data={products}
          numColumns={2}
          contentContainerStyle={styles.container}
          renderItem={({ item, index }) => {
            if (index < 10) {
              return (
                <View style={{ flex: 1, marginHorizontal: 8 }}>
                  <ProductCard product={item} />
                </View>
              )
            }
            return
          }}
          keyExtractor={(item) => `${item._id}`}
        />
      )}
    </View>
  )
}
