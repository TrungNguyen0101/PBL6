import { FlatList, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { get } from '../../../../../axios-config';

import styles from './styles';
import PopularProductItem from '../../../../../components/PopularProductItem';

export default function Popular() {
    const [products, setProducts] = useState();
    const fetchData = async () => {
        try {
            const response = await get('/products')
            if (response) {
                setProducts(response.data)
            }
        } catch (err) {
            throw err
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>Popular</Text>
            </View>
            <View>
                <FlatList
                    data={products}
                    renderItem={({ item }) => 
                        <PopularProductItem
                            product={item}
                            onPress={''}
                        />
                    }
                    keyExtractor={(item) => `${item.id}`}
                    horizontal
                    pagingEnabled
                />
            </View>
        </View>
    )
}
