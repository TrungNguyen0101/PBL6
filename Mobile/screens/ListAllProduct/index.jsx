/* eslint-disable react/react-in-jsx-scope */
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import styles from './styles'
import { get } from '../../axios-config'
import ProductCard from '../../components/ProductCard'
import { Entypo } from '@expo/vector-icons'
import colors from '../../contains/colors'

export default function ListAllProduct() {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await get(`/book?limit=6&page=${page}`)
      setProducts(response?.data?.data?.books)
      setTotalPage(response?.data?.data?.totalPages)
    } catch (err) {
      console.log(err?.message)
    } finally {
      setIsLoading(false)
    }
  }, [page])

  useEffect(() => {
    fetchData()
  }, [fetchData, page])

  const handlePrevPage = () => {
    if (page !== 1) {
      setPage(page - 1)
    }
  }

  const handleNextPage = () => {
    if (page < totalPage) {
      setPage(page + 1)
    }
  }

  return (
    <View style={styles.wrapper}>
      {isLoading ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator size="large" color={colors.primaryColor} />
        </View>
      ) : (
        <FlatList
          data={products}
          numColumns={2}
          contentContainerStyle={styles.container}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.innerWrapper,
                index === products.length - 1 && index % 2 === 0
                  ? { maxWidth: '50%' }
                  : {},
              ]}
            >
              <ProductCard product={item} />
            </View>
          )}
          keyExtractor={(item) => `${item._id}`}
        />
      )}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-end',
          flexDirection: 'row',
          gap: 12,
        }}
      >
        <Entypo
          name="arrow-with-circle-left"
          size={32}
          color="black"
          onPress={handlePrevPage}
        />
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          {page}/{totalPage}
        </Text>
        <Entypo
          name="arrow-with-circle-right"
          size={32}
          color="black"
          onPress={handleNextPage}
        />
      </View>
    </View>
  )
}
