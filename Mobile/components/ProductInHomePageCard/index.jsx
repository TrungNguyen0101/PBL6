import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

import { ProductContext } from '../../context/ProductProvider'

export default function ProductInHomePageCard({ product }) {
  const { setProductId } = useContext(ProductContext)
  const navigation = useNavigation();

  const handleNavigateDetailProduct = (id) => {
    setProductId(id)
    navigation?.navigate('DetailProduct')
  }
  return (
    <TouchableOpacity style={[styles.shadow, { borderWidth: 1, borderColor: '#000' }]} onPress={() => { handleNavigateDetailProduct(product?._id) }}>
      <View style={styles.container}>
        <Image style={[styles.img, { width: 200 }]} resizeMode="cover" source={{ uri: product?.mainImage[0]?.url }} />
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{product?.booktitle}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>${product?.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
