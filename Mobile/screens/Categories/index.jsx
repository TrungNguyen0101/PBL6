import { FlatList, View } from 'react-native';
import styles from './styles';

import CategoryListItem from '../../components/CategoryListItem';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Categories({ navigation }) {
  const [categories, setCategories] = useState([])

  const getData = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products/categories')
      if (response) {
        const categoryObjects = response.data.map((category, index) => ({
          id: index + 1,
          name: category,
        }));
        setCategories(categoryObjects);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({ item }) => <CategoryListItem
          category={item}
          navigation={navigation}
          onPress={() => navigation.navigate('Category', { headerName: item.name , categoryName: item.name})}
        />}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
}

