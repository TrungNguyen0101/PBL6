import { SafeAreaView, FlatList } from 'react-native'
import React from 'react'

//styles
import styles from './styles'

//components
import Banner from './components/Banner'
import Popular from './components/Popular'
import Search from './components/Search'
import CategorySection from '../../../components/CategorySection'

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={['banner', 'search', 'category', 'popular']}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          switch (item) {
            case 'banner':
              return <Banner />;
            case 'search':
              return <Search />;
            case 'category':
              return <CategorySection />;
            case 'popular':
              return <Popular title={'Phổ biến'} showIcon={true} />;
            default:
              return null;
          }
        }}
      />
    </SafeAreaView>
  )
}
