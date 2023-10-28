import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons';

import styles from '../VoucherList/styles'
import colors from '../../../../../contains/colors'
import { get } from '../../../../../axios-config';
import ProductListItem from '../../../../../components/ProductListItem';

export default function TrendItemList() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await get('/products');
      if (response) {
        setProducts(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    getData();
  }, [])

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
              <ProductListItem product={item} />
            </View>
          }
          keyExtractor={(item) => `${item.id}`}
        />
      )}
    </View>
  );

}