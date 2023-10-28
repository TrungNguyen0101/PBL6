import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { get } from '../../../../../axios-config';
import { FontAwesome5 } from '@expo/vector-icons';

import colors from '../../../../../contains/colors';
import styles from './styles';
import HomeProductItem from '../../../../../components/HomeProductItem';


export default function Popular() {
    const [products, setProducts] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await get('/products')
            if (response) {
                setProducts(response.data)
            }
        } catch (err) {
            throw err
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.titleWrapper}>
                <FontAwesome5 name="book-open" size={24} color={colors.primaryColor} />
                <Text style={styles.title}>Phổ biến</Text>
            </View>
            <View>
                {isLoading ? (
                    <ActivityIndicator size="large" color={colors.primaryColor} />
                ) : (
                    <FlatList
                        data={products}
                        renderItem={({ item }) =>
                            <HomeProductItem
                                product={item}
                                onPress={''}
                            />
                        }
                        keyExtractor={(item) => `${item.id}`}
                        horizontal
                        pagingEnabled
                    />
                    )}
            </View>
            <TouchableOpacity style={styles.discoverBtn}>
                <Text style={styles.discoverBtnText}>Discover all</Text>
            </TouchableOpacity>
        </View>
    )
}
