import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import styles from './styles'

export default function VoucherItem({ name, img, min, max }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.brandWrapper}>
        <Image style={styles.brandImg} source={img} />
        <Text style={[styles.brandName, { textAlign: 'center' }]}>{name}</Text>
      </View>
      <View style={styles.discountWrapper}>
        <Text style={styles.discountMin}>Giảm {min}</Text>
        <Text style={styles.discountMax}>Giảm tối đa {max}</Text>
        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Lưu</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
