import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'

import { FontAwesome } from '@expo/vector-icons'

import React from 'react'
import colors from '../../../../../../contains/colors'

export default function SearchInput() {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nhập nội dung cần tìm kiếm ..."
      />
      <TouchableOpacity>
        <FontAwesome name="search" size={32} color={colors.primaryColor} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    fontSize: 18,
  },
})
