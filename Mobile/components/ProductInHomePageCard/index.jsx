import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useNavigate } from 'react'
import { AntDesign } from '@expo/vector-icons';
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
    <TouchableOpacity style={styles.shadow} onPress={() => { handleNavigateDetailProduct(product?.id) }}>
      <View style={styles.container}>
        <Image style={styles.img} resizeMode="center" source={{ uri: product.image }} />
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{product.title}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>${product.price}</Text>
            <View style={styles.rateWrapper}>
              <Text style={styles.rate}>
                {product.rating?.rate}
              </Text>
              <AntDesign name="star" size={24} color={'#eabe12'} />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
