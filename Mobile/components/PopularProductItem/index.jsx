import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../contains/colors'
import { AntDesign } from '@expo/vector-icons';
export default function PopularProductItem({ product, onPress }) {
  return (
    <TouchableOpacity style={styles.shadow}>
      <View style={styles.container}>
        <Image style={styles.img} resizeMode="contain" source={{ uri: product.image }} />
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

const styles = StyleSheet.create({
  shadow: {
    shadowColor: colors.blackColor,
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    marginRight: 24
  },
  container: {
    marginBottom: 20,
    borderRadius: 4,
    backgroundColor: colors.whiteColor,
  },
  img: {
    height: 250,
  },
  info: {
    padding: 8
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    maxWidth: 180,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  price: {
    fontSize: 18,
    color: colors.primaryColor,
    fontWeight: 'bold',
  },
  rateWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rate: {
    fontSize: 16,
    fontWeight: 'bold'
  },
})