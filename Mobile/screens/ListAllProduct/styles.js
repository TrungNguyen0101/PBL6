import { StyleSheet } from 'react-native';

import colors from '../../contains/colors';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.grayColor,
  },
  container: {
    paddingTop: 4,
  },
  innerWrapper: {
    flex: 1,
    paddingHorizontal: 6,
  },
});

export default styles;
