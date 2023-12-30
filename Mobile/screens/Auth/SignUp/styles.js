import { StyleSheet } from 'react-native'

import colors from '../../../contains/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    height: '100%',
    resizeMode: 'stretch',
    alignSelf: 'flex-start',
  },
  formWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingHorizontal: 16,
    paddingVertical: 28,
    borderRadius: 12,
    marginHorizontal: 32,
  },
  errorText: {
    color: 'red',
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  inputWrapper: {
    marginBottom: 12,
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    backgroundColor: colors.whiteColor,
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 6,
    fontSize: 16,
  },
  inputPassword: {
    paddingRight: 62,
  },
  hidePassword: {
    position: 'absolute',
    alignSelf: 'flex-end',
    textAlignVertical: 'center',
    height: '100%',
    paddingHorizontal: 16,
  },
  loginBtn: {
    backgroundColor: colors.whiteColor,
    alignItems: 'center',
    borderRadius: 6,
    paddingVertical: 15,
    marginTop: 12,
  },
  loginText: {
    color: colors.blackColor,
    fontWeight: '700',
    fontSize: 20,
  },
  notice: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  noticeText: {
    color: colors.blackColor,
  },
  signUpLink: {
    color: colors.blackColor,
    fontWeight: '800',
    marginLeft: 4,
  },
  returnHome: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
})

export default styles
