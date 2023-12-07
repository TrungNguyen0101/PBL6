/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { FlatList, View } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import styles from './styles'
import { get } from '../../axios-config'
import ProductCard from '../../components/ProductCard'

export default function ListProductByCategory({ route }) {
  const { categoryName } = route.params
  const [filteredProducts, setFilteredProducts] = useState([])

  const fetchData = useCallback(async () => {
    try {
      const response = await get(`/book/book-by-category?value=${categoryName}`)
      setFilteredProducts(response?.data?.data?.book)
    } catch (err) {
      console.log(err?.message)
    }
  }, [categoryName])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={filteredProducts}
        numColumns={2}
        contentContainerStyle={styles.container}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.innerWrapper,
              index === filteredProducts.length - 1 && index % 2 === 0
                ? { maxWidth: '50%' }
                : {},
            ]}
          >
            <ProductCard product={item} />
          </View>
        )}
        keyExtractor={(item) => `${item._id}`}
      />
    </View>
  )
}
