/* eslint-disable react/prop-types */
import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import { ProductContext } from '../../context/ProductProvider'

export default function ProductCard({ product }) {
  const { setProductId } = useContext(ProductContext)
  const navigation = useNavigation()

  const handleNavigateDetail = () => {
    setProductId(product?._id)
    navigation.navigate('DetailProduct')
  }

  return (
    <TouchableOpacity style={styles.shadow} onPress={handleNavigateDetail}>
      <View style={styles.container}>
        <Image
          style={styles.img}
          resizeMode="cover"
          source={{ uri: product?.mainImage[0].url }}
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
                {product?.price.toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </Text>
              <Text style={styles.price}>

                {Number(
                  (product?.price * (100 - product?.discount)) / 100,
                ).toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </Text>
            </View>
          ) : (
            <View>
              <Text style={styles.price}>{product?.price.toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND',
              })}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}
