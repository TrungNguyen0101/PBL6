import { ActivityIndicator, Dimensions, FlatList, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import colors from '../../../../../contains/colors';

//axios
import { get } from '../../../../../axios-config';

//component
import CategoryCard from '../../../../../components/CategoryCard';

export default function Category() {
  const [categories, setCategories] = useState([])
  const navigation = useNavigation()
  const screenHeight = Dimensions.get('window').height
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await get('/category')
      const categoryObjects = response?.data?.data?.categories.map((category, index) => ({
        id: index + 1,
        label: category?.label,
        value: category?.value,
      }));
      setCategories(categoryObjects);
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <View style={[styles.container, { height: screenHeight * 0.3 }]}>
      <View style={styles.titleWrapper}>
        <FontAwesome name="bookmark" size={24} color={colors.primaryColor} />
        <Text style={styles.title}>Thể loại</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primaryColor} />
      ) : (
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <CategoryCard
              category={item}
              navigation={navigation}
              onPress={() => navigation?.navigate('CategoryProduct', { headerName: item?.label, categoryName: item?.label })}
            />
          )}
          keyExtractor={(item) => `${item?.id}`}
          horizontal
          pagingEnabled
        />)}
    </View>
  );
}

