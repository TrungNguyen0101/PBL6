/* eslint-disable react/prop-types */
import React, {
  useEffect,
  createContext,
  useState,
  useMemo,
  useCallback,
} from 'react'
import { get } from '../axios-config'

export const ProductContext = createContext()

function ProductProvider({ children }) {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [productId, setProductId] = useState(null)
  const [detailProduct, setDetailProduct] = useState(null)
  const [comments, setComments] = useState(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await get('/book?page=1&&limit=1000')
      setProducts(response?.data?.data?.books)
    } catch (err) {
      console.error('Error fetching data:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchDetailProductData = useCallback(async () => {
    try {
      const response = await get(`/book/${productId}`)
      setDetailProduct(response?.data?.data?.book)
    } catch (err) {
      console.log(err?.message)
    }
  }, [productId])

  const fetchCommentsProductData = useCallback(async (id) => {
    try {
      const response = await get(`/book/${id}/comments`)
      setComments(response?.data?.data?.comments)
    } catch (err) {
      console.log(err?.message)
    }
  }, [])

  useEffect(() => {
    fetchData()
    if (productId) {
      fetchDetailProductData()
      fetchCommentsProductData(detailProduct?._id)
    }
  }, [
    detailProduct?._id,
    fetchCommentsProductData,
    fetchData,
    fetchDetailProductData,
    productId,
  ])

  const contextValue = useMemo(
    () => ({
      products,
      isLoading,
      productId,
      setProductId,
      detailProduct,
      comments,
      fetchCommentsProductData,
    }),
    [
      products,
      isLoading,
      productId,
      detailProduct,
      comments,
      fetchCommentsProductData,
    ],
  )

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider
