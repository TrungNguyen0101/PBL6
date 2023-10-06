import { View, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'

//styles
import styles from './styles'

//components
import Banner from './components/Banner'
import Category from './components/Category'
import Popular from './components/Popular'

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Banner />
        <Category />
        <Popular />
      </ScrollView>
    </SafeAreaView>
  )
}
