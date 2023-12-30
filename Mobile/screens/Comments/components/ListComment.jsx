import { Dimensions, FlatList, View } from 'react-native'
import React, { useContext } from 'react'
import { ProductContext } from '../../../context/ProductProvider'
import RateCard from '../../DetailProduct/components/RateCard'

export default function ListComment() {
    const { comments } = useContext(ProductContext)
    const screenHeight = Dimensions.get('window').height
    return (
        <View style={{ flex: 1, paddingHorizontal: 12 }}>
            <FlatList
                data={comments}
                renderItem={({ item }) => (
                    <RateCard
                        key={item?._id}
                        id={item?._id}
                        userId={item?.user?._id}
                        name={item?.user?.username}
                        comment={item?.comment}
                        createdAt={item?.createdAt}
                    />
                )}
                pagingEnabled
                keyExtractor={(item) => item?._id}
                style={{ height: screenHeight }}
            />
        </View>
    )
}
