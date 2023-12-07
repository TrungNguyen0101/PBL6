/* eslint-disable react/prop-types */
import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'

import styles from './styles'

import { ProductContext } from '../../context/ProductProvider'

export default function ProductInHomePageCard({ product }) {
  const { setProductId } = useContext(ProductContext)
  const navigation = useNavigation()

  const handleNavigateDetailProduct = (id) => {
    setProductId(id)
    navigation?.navigate('DetailProduct')
  }
  return (
    <TouchableOpacity
      style={[styles.shadow, { borderWidth: 1, borderColor: '#000' }]}
      onPress={() => {
        handleNavigateDetailProduct(product?._id)
      }}
    >
      <View style={styles.container}>
        <Image
          style={[styles.img, { width: 200 }]}
          resizeMode="cover"
          source={{ uri: product?.mainImage[0]?.url }}
        />
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
            {product?.booktitle}
          </Text>
          {product?.discount !== 0 ? (
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Text
                style={[
                  styles.price,
                  {
                    textDecorationLine: 'line-through',
                    color: '#000',
                    opacity: 0.5,
                  },
                ]}
              >
                ${product?.price}
              </Text>
              <Text style={styles.price}>
                $
                {Number(
                  (product?.price * (100 - product?.discount)) / 100,
                ).toFixed(2)}
              </Text>
            </View>
          ) : (
            <View>
              <Text style={styles.price}>${product?.price}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}
