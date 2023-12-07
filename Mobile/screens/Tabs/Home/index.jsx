import { SafeAreaView, FlatList } from 'react-native'
import React from 'react'

//styles
import styles from './styles'

//components
import Banner from './components/Banner'
import Popular from './components/Popular'
import Search from './components/Search'
import Category from './components/Category'

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={['banner', 'search', 'category', 'popular']}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          switch (item) {
            case 'banner':
              return <Banner />
            case 'search':
              return <Search />
            case 'category':
              return <Category />
            case 'popular':
              return <Popular />
            default:
              return null
          }
        }}
      />
    </SafeAreaView>
  )
}
