/* eslint-disable react/prop-types */
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from './styles'

import categoryBg from '../../assets/Image/Home/categoryBg.jpg'

export default function CategoryCard({ category, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={styles.container}
    >
      <View>
        <ImageBackground source={categoryBg} style={styles.backgroundImage}>
          <View style={styles.textWrapper}>
            <Text style={styles.title}>{category?.label}</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  )
}
