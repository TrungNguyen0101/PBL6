import { StyleSheet } from 'react-native';

import colors from '../../contains/colors';

const styles = StyleSheet.create({
  backWrapper: {
    position: 'absolute',
    top: 40,
    left: 12,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  backText: {
    fontSize: 16,
    color: colors.whiteColor,
  },
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  avatarWrapper: {
    position: 'absolute',
    alignItems: 'center',
  },
  avatarImg: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.blackColor,
  },
  avatarName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  updateBtn: {
    backgroundColor: colors.primaryColor,
  },
  updateBtnText: {
    color: colors.whiteColor,
    fontSize: 18,
    fontWeight: '500',
  },
  profileWrapper: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 24,
  },
  infoWrapper: {
    gap: 6,
    marginVertical: 6,
  },
  info: {
    fontSize: 18,
    fontWeight: '500',
    flex: 1,
  },
  infoInput: {
    fontSize: 18,
    backgroundColor: colors.grayColor,
    paddingVertical: 8,
    paddingHorizontal: 20,
    flex: 3,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.blackColor
  },
  errorText: {
    alignSelf: 'flex-end',
    color: 'red',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default styles;
