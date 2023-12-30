import { StyleSheet } from 'react-native'

import colors from '../../contains/colors'

const styles = StyleSheet.create({
  shadow: {
    shadowColor: colors.blackColor,
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 1, height: 1 },
    flex: 1,
  },
  container: {
    marginBottom: 12,
    borderRadius: 4,
    backgroundColor: colors.whiteColor,
    overflow: 'hidden',
  },
  img: {
    height: 150,
  },
  info: {
    padding: 8,
  },
  name: {
    fontSize: 16,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    color: colors.orangeColor,
  },
})

export default styles
