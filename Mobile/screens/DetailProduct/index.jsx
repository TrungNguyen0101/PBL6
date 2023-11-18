import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';

import { ProductContext } from '../../context/ProductProvider'
import colors from '../../contains/colors'

export default function DetailProduct() {
    const { productId, products } = useContext(ProductContext)
    const [productDetail, setProductDetail] = useState()
    const screenWitdh = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height
    useEffect(() => {
        const productDetailData = products.find(product => product?.id === productId)
        if (productDetailData) {
            setProductDetail(productDetailData)
        }
    }, [])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgColor }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1, width: screenWitdh, height: 300, backgroundColor: 'pink', position: 'relative' }}>
                    <TouchableOpacity style={{ position: 'absolute', flexDirection: 'row', top: 40, left: 20, alignItems: 'center', gap: 12 }} onPress={() => navigation.navigate('Settings')}>
                        <AntDesign name="left" size={24} color={colors.blackColor} style={{ fontWeight: 800 }} />
                        <Text style={styles.backText}>Trở lại</Text>
                    </TouchableOpacity>
                    <Image style={{ flex: 1, width: screenWitdh }} resizeMode="center" source={{ uri: productDetail?.image }} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})