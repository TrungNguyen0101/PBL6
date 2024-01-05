import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { FontAwesome } from '@expo/vector-icons'

import React, { useCallback, useContext, useEffect, useState } from 'react'
import colors from '../../../../../../contains/colors'
import { post } from '../../../../../../axios-config'
import { useNavigation } from '@react-navigation/native'
import { ProductContext } from '../../../../../../context/ProductProvider'

export default function SearchInput() {
  const [title, setTitle] = useState('')
  const [books, setBooks] = useState([])
  const { setProductId } = useContext(ProductContext)

  const navigation = useNavigation()

  const fetchData = useCallback(async () => {
    try {
      const response = await post(`/book/search?title=${title === '' ? "123123123" : title}`)
      if (response) {
        setBooks(response?.data?.data);
      }
    } catch (error) {
      console.log(error)
    }
  }, [title])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleDetailBook = (id) => {
    setProductId(id)
    navigation?.navigate('DetailProduct')
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={setTitle}
        style={styles.input}
        placeholder="Nhập nội dung cần tìm kiếm ..."
      />
      <TouchableOpacity>
        <FontAwesome name="search" size={32} color={colors.primaryColor} />
      </TouchableOpacity>
      {books.length > 0 && (
        <View style={{ position: 'absolute', bottom: 68, width: '109%', backgroundColor: '#fff', zIndex: 99999999999999, borderColor: '#000', borderWidth: 1, borderRadius: 6 }}>
          <View style={{ flexDirection: 'column', paddingHorizontal: 12, paddingVertical: 8 }}>
            {books.map((book, index) => {
              if (index > 2) return;
              return (
                <TouchableOpacity onPress={() => handleDetailBook(book._id)} key={index} style={{ paddingVertical: 8, borderBottomWidth: 1, borderColor: '#ccc', }}>
                  <Text numberOfLines={1} style={{ fontSize: 18, flexWrap: 'nowrap', overflow: 'hidden', }}>{book.booktitle}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      )}
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
