import { StyleSheet } from 'react-native'

import colors from '../../contains/colors'

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.grayColor,
  },
  container: {
    paddingVertical: 8,
  },
  innerWrapper: {
    flex: 1,
    paddingHorizontal: 6,
  },
})

export default styles
