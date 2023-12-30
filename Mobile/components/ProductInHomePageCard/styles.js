import { StyleSheet } from 'react-native'

import colors from '../../contains/colors'

const styles = StyleSheet.create({
  shadow: {
    shadowColor: colors.blackColor,
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    marginRight: 20,
    borderRadius: 8,
  },
  container: {
    borderRadius: 8,
    backgroundColor: colors.whiteColor,
  },
  img: {
    height: 200,
  },
  info: {
    padding: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    maxWidth: 180,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 18,
    color: colors.primaryColor,
    fontWeight: 'bold',
  },
  rateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default styles
