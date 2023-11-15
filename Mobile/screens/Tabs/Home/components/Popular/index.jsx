import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import colors from '../../../../../contains/colors';
import styles from './styles';
import ProductInHomePageCard from '../../../../../components/ProductInHomePageCard';
import { ProductContext } from '../../../../../context/ProductProvider';

export default function Popular({ title, showIcon }) {
    const { products, isLoading } = useContext(ProductContext);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.titleWrapper}>
                {showIcon ?
                    <FontAwesome5 name="book-open" size={24} color={colors.blackColor} />
                    : ''}
                <Text style={styles.title}>{title}</Text>
            </View>
            <View>
                {isLoading ? (
                    <ActivityIndicator size="large" color={colors.primaryColor} />
                ) : (
                    <FlatList
                        data={products}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => navigateToProduct(item.id)}>
                                <ProductInHomePageCard product={item} />
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => `${item.id}`}
                        horizontal
                        pagingEnabled
                    />
                )}
            </View>
            <TouchableOpacity style={styles.discoverBtn} onPress={() => navigation.navigate('AllProducts')}>
                <Text style={styles.discoverBtnText}>Discover all</Text>
            </TouchableOpacity>
        </View>
    );
}
