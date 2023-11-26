import { FlatList, View } from 'react-native';
import { useEffect, useState } from 'react';
import ProductByCategoryCard from '../../components/ProductByCategoryCard';
import styles from './styles';
import { get } from '../../axios-config';

export default function ListProductByCategory({ route }) {
    const { categoryName } = route.params;
    const [filteredProducts, setFilteredProducts] = useState([]);

    const fetchData = async () => {
        try {
            const response = await get(`/book/book-by-category?value=${categoryName}`)
            setFilteredProducts(response?.data?.data?.book)
        } catch (err) {
            console.log(err?.message)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <View style={styles.wrapper}>
            <FlatList
                data={filteredProducts}
                numColumns={2}
                contentContainerStyle={styles.container}
                renderItem={({ item }) => (
                    <View style={styles.innerWrapper}>
                        <ProductByCategoryCard product={item} />
                    </View>
                )}
                keyExtractor={(item) => `${item._id}`}
            />
        </View>
    );
}
