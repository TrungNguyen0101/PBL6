import { StyleSheet } from 'react-native';

import colors from '../../../contains/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
  },
  title: {
    color: colors.whiteColor,
    fontSize: 44,
    fontWeight: '700',
  },
  loginWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 12,
  },
  iconLoginWrapper: {
    backgroundColor: colors.whiteColor,
    borderRadius: 100,
  },
  signInText: {
    fontSize: 32,
    color: colors.whiteColor,
    fontWeight: '600',
  },
  body: {
    flex: 3,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.whiteColor,
    paddingHorizontal: 20,
    paddingVertical: 8,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  optionIconWrapper: {
    backgroundColor: colors.primaryColor,
    borderRadius: 100,
    padding: 8,
  },
  optionTextWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 20,
    fontWeight: '500',
  },
});

export default styles;
