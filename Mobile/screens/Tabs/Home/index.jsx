import { SafeAreaView, FlatList } from 'react-native'
import React from 'react'

//styles
import styles from './styles'

//components
import Banner from './components/Banner'
import Category from '../../../components/Category'
import Popular from './components/Popular'

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={['banner', 'category', 'popular']}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          switch (item) {
            case 'banner':
              return <Banner />;
            case 'category':
              return <Category />;
            case 'popular':
              return <Popular />;
            default:
              return null;
          }
        }}
      />
    </SafeAreaView>
  )
}
