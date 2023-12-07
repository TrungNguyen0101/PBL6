import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'

import colors from '../../../contains/colors'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import { ProductContext } from '../../../context/ProductProvider'
import { get } from '../../../axios-config'

export default function Overview() {
  const { productId } = useContext(ProductContext)
  const [productDetail, setProductDetail] = useState()
  const screenWitdh = Dimensions.get('window').width
  const navigation = useNavigation()

  const fetchData = useCallback(async () => {
    try {
      const response = await get(`/book/${productId}`)
      setProductDetail(response?.data?.data?.book)
    } catch (err) {
      console.log(err?.message)
    }
  }, [productId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <View style={{ marginBottom: 40 }}>
      <View
        style={{
          flex: 1,
          width: screenWitdh,
          height: 300,
          position: 'relative',
          marginTop: 20,
          borderBottomWidth: 2,
          borderBottomColor: colors.grayColor,
          paddingVertical: 8,
        }}
      >
        <TouchableOpacity
          style={{
            position: 'absolute',
            flexDirection: 'row',
            top: 40,
            left: 12,
            alignItems: 'center',
            gap: 4,
            zIndex: 999999,
          }}
          onPress={() => navigation.navigate('Home')}
        >
          <AntDesign
            name="left"
            size={24}
            color={colors.blackColor}
            style={{ fontWeight: 800 }}
          />
          <Text style={{ fontSize: 18 }}>Trở lại</Text>
        </TouchableOpacity>
        <Image
          style={{ flex: 1, width: screenWitdh }}
          resizeMode="center"
          source={{ uri: productDetail?.mainImage[0]?.url }}
        />
      </View>
      <View style={{ paddingHorizontal: 12, gap: 8 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            textAlign: 'justify',
            marginTop: 12,
          }}
        >
          {productDetail?.booktitle}
        </Text>
        {productDetail?.discount !== 0 ? (
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Text
              style={[
                { fontSize: 20, fontWeight: 500 },
                {
                  textDecorationLine: 'line-through',
                  color: '#000',
                  opacity: 0.5,
                },
              ]}
            >
              ${productDetail?.price}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 500,
                color: colors.orangeColor,
              }}
            >
              $
              {Number(
                (productDetail?.price * (100 - productDetail?.discount)) / 100,
              ).toFixed(2)}
            </Text>
          </View>
        ) : (
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 500,
                color: colors.orangeColor,
              }}
            >
              ${productDetail?.price}
            </Text>
          </View>
        )}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={{ fontSize: 18 }}>Tác giả: </Text>
            <Text style={{ fontSize: 18 }}>{productDetail?.author}</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <AntDesign name="hearto" size={24} color="black" />
            <AntDesign name="sharealt" size={24} color="black" />
          </View>
        </View>
        <View style={{ marginVertical: 16, gap: 6 }}>
          <Text style={{ fontSize: 22, fontWeight: '600' }}>
            Thông tin sản phẩm
          </Text>
          {productDetail ? (
            <View>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '400',
                  textAlign: 'justify',
                }}
              >
                {productDetail?.desc}
              </Text>
              <FlatList
                data={productDetail?.descImage}
                renderItem={({ item }) => (
                  <Image
                    style={{ flex: 1, width: screenWitdh - 24, height: 200 }}
                    resizeMode="cover"
                    source={{ uri: item?.url }}
                  />
                )}
                keyExtractor={(item) => `${item?.uid}`}
                horizontal
                pagingEnabled
              />
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '400',
                  textAlign: 'justify',
                }}
              >
                {productDetail?.infomation}
              </Text>
            </View>
          ) : (
            <ActivityIndicator size="large" color={colors.primaryColor} />
          )}
        </View>
      </View>
    </View>
  )
}
