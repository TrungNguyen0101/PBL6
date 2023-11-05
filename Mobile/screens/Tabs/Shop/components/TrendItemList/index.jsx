import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons';

import styles from '../VoucherList/styles'
import colors from '../../../../../contains/colors'
import CategoryProductCard from '../../../../../components/CategoryProductCard';
import { ProductContext } from '../../../../../context/ProductProvider';
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
          renderItem={({ item }) =>
            <View style={{ flex: 1, marginHorizontal: 8 }}>
              <CategoryProductCard product={item} />
            </View>
          }
          keyExtractor={(item) => `${item.id}`}
        />
      )}
    </View>
  );

}