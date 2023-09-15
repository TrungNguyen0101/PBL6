import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from './styles'

export default function CategoryListItem({ navigation, category, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{category.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

