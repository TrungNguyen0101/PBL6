import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import colors from '../../../contains/colors'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import { ProductContext } from '../../../context/ProductProvider';

export default function Overview() {
    const { productId, products } = useContext(ProductContext)
    const [productDetail, setProductDetail] = useState()
    const screenWitdh = Dimensions.get('window').width
    const navigation = useNavigation()
    useEffect(() => {
        const productDetailData = products.find(product => product?.id === productId)
        if (productDetailData) {
            setProductDetail(productDetailData)
        }
    }, [])
    return (
        <View style={{ marginBottom: 40 }}>
            <View style={{ flex: 1, width: screenWitdh, height: 300, position: 'relative', marginTop: 20, borderBottomWidth: 2, borderBottomColor: colors.grayColor, paddingVertical: 8 }}>
                <TouchableOpacity style={{ position: 'absolute', flexDirection: 'row', top: 40, left: 12, alignItems: 'center', gap: 4, zIndex: 999999 }} onPress={() => navigation.navigate('Home')}>
                    <AntDesign name="left" size={24} color={colors.blackColor} style={{ fontWeight: 800 }} />
                    <Text style={{ fontSize: 18 }}>Trở lại</Text>
                </TouchableOpacity>
                <Image style={{ flex: 1, width: screenWitdh }} resizeMode="center" source={{ uri: productDetail?.image }} />
            </View>
            <View style={{ paddingHorizontal: 12, gap: 8 }}>
                <Text style={{ fontSize: 20, fontWeight: '700', textAlign: 'justify' }}>{productDetail?.title}</Text>
                <View style={{ flexDirection: 'row', gap: 6 }}>
                    <Text style={{ fontSize: 20, fontWeight: '500', color: colors.orangeColor }}>{productDetail?.price}</Text>
                    <Text style={{ fontSize: 20, fontWeight: '500', color: colors.orangeColor }}>đ</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <Text style={{ fontSize: 20, fontWeight: '500' }}>{productDetail?.rating?.rate}</Text>
                        <AntDesign name="star" size={24} color="#ffA500" />
                    </View>
                    <View style={{ flexDirection: 'row', gap: 12 }}>
                        <AntDesign name="hearto" size={24} color="black" />
                        <AntDesign name="sharealt" size={24} color="black" />
                    </View>
                </View>
                <View style={{ marginVertical: 16, gap: 6 }}>
                    <Text style={{ fontSize: 22, fontWeight: '600' }}>Thông tin sản phẩm</Text>
                    <Text style={{ fontSize: 17, fontWeight: '400', textAlign: 'justify' }}>{productDetail?.description}</Text>
                </View>
            </View>
        </View>
    )
}