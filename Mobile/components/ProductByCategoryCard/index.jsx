import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import styles from './styles'
import colors from '../../contains/colors'
import { useNavigation } from '@react-navigation/native'
import { ProductContext } from '../../context/ProductProvider'

export default function ProductByCategoryCard({ product }) {
    const { setProductId } = useContext(ProductContext)
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.shadow} onPress={() => {
            setProductId(product?._id)
            navigation.navigate('DetailProduct')
        }}>
            <View style={styles.container}>
                <Image style={styles.img} resizeMode="cover" source={{ uri: product?.mainImage[0].url }} />
                <View style={styles.info}>
                    <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{product?.booktitle}</Text>
                    <View style={styles.priceRow}>
                        <Text style={[styles.price, { color: colors.orangeColor }]}>$ {product?.price}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

