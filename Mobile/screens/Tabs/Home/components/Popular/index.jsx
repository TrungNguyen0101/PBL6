import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useContext } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import colors from '../../../../../contains/colors'
import styles from './styles'
import ProductInHomePageCard from '../../../../../components/ProductInHomePageCard'
import { ProductContext } from '../../../../../context/ProductProvider'

export default function Popular() {
  const { products, isLoading } = useContext(ProductContext)
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <FontAwesome5 name="book-open" size={24} color={colors.primaryColor} />
        <Text style={styles.title}>Phổ biến</Text>
      </View>
      <View>
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primaryColor} />
        ) : (
          <FlatList
            data={products}
            renderItem={({ item }) => <ProductInHomePageCard product={item} />}
            keyExtractor={(item) => `${item?._id}`}
            horizontal
            pagingEnabled
          />
        )}
      </View>
      <TouchableOpacity
        style={[styles.discoverBtn, { marginTop: 12 }]}
        onPress={() =>
          navigation.navigate('AllProducts', { headerName: 'Sản phẩm' })
        }
      >
        <Text style={styles.discoverBtnText}>Discover all</Text>
      </TouchableOpacity>
    </View>
  )
}
