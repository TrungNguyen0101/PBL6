import { Dimensions, FlatList, SafeAreaView } from 'react-native';
import styles from './styles';

import VoucherList from './components/VoucherList';
import TrendItemList from './components/TrendItemList';
import CategorySection from '../../../components/CategorySection';

export default function Shop() {
  const screenHeight = Dimensions.get('window').height
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ alignItems: 'stretch' }}
        style={[styles.container, { height: screenHeight * 0.4 }]}
        data={['category', 'trendItemList', 'voucherList']}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          switch (item) {
            case 'category':
              return <CategorySection />;
            case 'trendItemList':
              return <TrendItemList />;
            case 'voucherList':
              return <VoucherList />;
            default:
              return null;
          }
        }}
      />
    </SafeAreaView>

  );
}

