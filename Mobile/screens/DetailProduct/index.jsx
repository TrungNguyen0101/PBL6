import { SafeAreaView, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import colors from '../../contains/colors'
import Overview from './components/Overview'
import Filter from './components/Filter'
import ListRate from './components/ListRate'
import { ProductContext } from '../../context/ProductProvider'

export default function DetailProduct() {
  const { detailProduct } = useContext(ProductContext)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgColor }}>
      <ScrollView style={{ flex: 1 }}>
        <Overview />
        <ListRate />
      </ScrollView>
      <Filter book={detailProduct} />
    </SafeAreaView>
  )
}
