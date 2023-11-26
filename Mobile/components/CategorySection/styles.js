import { StyleSheet } from 'react-native';

import colors from '../../contains/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 12,
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomColor: colors.blackColor,
    borderBottomWidth: 2,
  },
  title: {
    color: colors.blackColor,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default styles;
