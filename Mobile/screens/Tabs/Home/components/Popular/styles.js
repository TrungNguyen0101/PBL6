import { StyleSheet } from 'react-native';

import colors from '../../../../../contains/colors';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomColor: colors.blackColor,
    borderBottomWidth: 2,
  },
  title: {
    color: colors.primaryColor,
    fontSize: 24,
    fontWeight: 'bold',
  },
  discoverBtn: {
    color: colors.whiteColor,
    fontWeight: 'bold',
    fontSize: 17,
    backgroundColor: colors.primaryColor,
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  discoverBtnText: {
    color: colors.whiteColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
