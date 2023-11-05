import { FlatList, View } from 'react-native';
import { useEffect, useContext, useState } from 'react';
import { ProductContext } from '../../context/ProductProvider';
import CategoryProductCard from '../../components/CategoryProductCard';
import styles from './styles';

export default function CategoryProduct({ route }) {
    const { categoryName } = route.params;
    const { products } = useContext(ProductContext);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        if (products) {
            if (categoryName) {
                const filteredProducts = products.filter(product => product.category === categoryName);
                setFilteredProducts(filteredProducts);
            } else {
                setFilteredProducts([]);
            }
        }
    }, [categoryName, products]);

    return (
        <View style={styles.wrapper}>
            <FlatList
                data={filteredProducts}
                numColumns={2}
                contentContainerStyle={styles.container}
                renderItem={({ item }) => (
                    <View style={styles.innerWrapper}>
                        <CategoryProductCard product={item} />
                    </View>
                )}
                keyExtractor={(item) => `${item.id}`}
            />
        </View>
    );
}
