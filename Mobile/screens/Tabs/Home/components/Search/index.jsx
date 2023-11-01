import { View } from 'react-native'
import React from 'react'

import styles from './style'
import SearchInput from './components/SearchInput';

export default function Search() {
  return (
    <View style={styles.container}>
      <SearchInput />
    </View>
  )
}
