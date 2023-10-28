import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

import styles from './styles';
export default function HomeProductItem({ product, onPress }) {
  return (
    <TouchableOpacity style={styles.shadow}>
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
