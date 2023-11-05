import { StyleSheet } from 'react-native';

import colors from '../../../../../contains/colors';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.blackColor,
    borderRadius: 8,
    backgroundColor: colors.bgColor,
  },
  brandWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: colors.blackColor,
    borderRightWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  brandImg: {
    width: 50,
    height: 50,
  },
  brandName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  discountWrapper: {
    flex: 3,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
  },
  discountMin: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  discountMax: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(0,0,0,0.6)',
  },
  saveBtn: {
    color: colors.whiteColor,
    fontWeight: 'bold',
    fontSize: 17,
    backgroundColor: colors.primaryColor,
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 20,
  },
  saveBtnText: {
    fontSize: 15,
    color: colors.whiteColor,
    fontWeight: '500',
  },
});

export default styles;
