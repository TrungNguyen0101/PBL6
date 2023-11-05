import { StyleSheet } from 'react-native';

import colors from '../../../../../contains/colors';

const styles = StyleSheet.create({
  dotWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    top: -28,
  },
  dotActive: {
    backgroundColor: colors.primaryColor,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  dotNonActive: {
    backgroundColor: colors.grayColor,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  descriptionWrapper: {
    position: 'absolute',
    bottom: 60,
    paddingHorizontal: 16,
    flexDirection: 'column',
    gap: 8,
  },
  descriptionName: {
    color: colors.whiteColor,
    fontSize: 18,
  },
  descriptionCategory: {
    color: colors.whiteColor,
    fontSize: 17,
  },
  descriptionText: {
    color: colors.whiteColor,
    fontSize: 16,
    textAlign: 'justify',
  },
  detailBtn: {
    color: colors.whiteColor,
    fontWeight: 'bold',
    fontSize: 17,
    backgroundColor: colors.primaryColor,
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
});

export default styles;
