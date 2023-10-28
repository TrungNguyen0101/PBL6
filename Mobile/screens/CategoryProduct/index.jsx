import { FlatList, View } from 'react-native';
import styles from './styles'
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductListItem from '../../components/ProductListItem';

export default function CategoryProduct({ route }) {
    const { categoryName } = route.params;
    const [products, setProducts] = useState([])

    const getData = async () => {
        try {
            const response = await axios.get('/products')
            if (response) {
                if (categoryName) {
                    const filteredProducts = response.data.filter(product => product.category === categoryName);
                    setProducts(filteredProducts);
                }
                else {
                    setProducts([])
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData();
    }, [categoryName])

    return (
        <View style={styles.wrapper}>
            <FlatList
                data={products}
                numColumns={2}
                contentContainerStyle={styles.container}
                renderItem={({ item }) =>
                    <View style={styles.wrapper}>
                        <ProductListItem product={item} />
                    </View>
                }
                keyExtractor={(item) => `${item.id}`}
            />
        </View>
    );
}

