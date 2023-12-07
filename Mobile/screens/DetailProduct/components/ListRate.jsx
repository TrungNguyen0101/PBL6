import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import colors from '../../../contains/colors'

import RateCard from './RateCard'
import { ProductContext } from '../../../context/ProductProvider'

export default function ListRate() {
  const { comments } = useContext(ProductContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (comments) setIsLoading(false)
  }, [comments])

  return (
    <View style={{ paddingHorizontal: 12 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
          marginBottom: 12,
          paddingBottom: 8,
          borderBottomColor: colors.blackColor,
          borderBottomWidth: 2,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          Đánh giá sản phẩm
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              color: colors.orangeColor,
            }}
          >
            Xem tất cả
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primaryColor} />
        ) : comments?.length > 0 ? (
          comments?.map((comment, index) => {
            if (index < 5) {
              return (
                <RateCard
                  key={comment?._id}
                  name={comment?.user?.username}
                  comment={comment?.comment}
                  createdAt={comment?.createdAt}
                />
              )
            }
          })
        ) : (
          <View
            style={{
              flex: 1,
              height: 200,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
              Không có đánh giá
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}
