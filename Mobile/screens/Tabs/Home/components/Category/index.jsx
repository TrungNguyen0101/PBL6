import { Dimensions, FlatList, View } from 'react-native';
import { useEffect, useState } from 'react';

import styles from './styles';

//axios
import { get } from '../../../../../axios-config';

//component
import CategoryListItem from '../../../../../components/CategoryListItem';
import { useNavigation } from '@react-navigation/native';

export default function Category() {
  const [categories, setCategories] = useState([])
  const navigation = useNavigation()
  const screenHeight = Dimensions.get('window').height

  const getData = async () => {
    try {
      const response = await get('/products/categories')
      if (response) {
        const categoryObjects = response.data.map((category, index) => ({
          id: index + 1,
          name: category,
        }));
        setCategories(categoryObjects);
      }
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <View style={[styles.container, { height: screenHeight * 0.15 }]}>
      <FlatList
        data={categories}
        renderItem={({ item }) => <CategoryListItem
          category={item}
          navigation={navigation}
          onPress={() => navigation?.navigate('CategoryProduct', { headerName: item.name, categoryName: item.name })}
        />}
        keyExtractor={(item) => `${item.id}`}
        horizontal
        pagingEnabled
      />
    </View>
  );
}

