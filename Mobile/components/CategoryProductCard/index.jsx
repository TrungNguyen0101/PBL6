import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from './styles'

export default function CategoryProductCard({ product, onAddToCart }) {
    return (
        <TouchableOpacity style={styles.shadow}>
            <View style={styles.container}>
                <Image style={styles.img} resizeMode="contain" source={{ uri: product?.image }} />
                <View style={styles.info}>
                    <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">{product?.title}</Text>
                    <View style={styles.priceRow}>
                        <Text style={styles.price}>{product?.price}</Text>
                        <TouchableOpacity onPress={onAddToCart} style={styles.cartBtn}>
                            <Text style={styles.cartText}>Buy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

