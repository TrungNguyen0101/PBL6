import { StyleSheet } from "react-native"
import colors from "../../contains/colors";

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginVertical: 4,
    elevation: 12,
    backgroundColor: 'white', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  backgroundImage: {
    width: 180,
    height: '100%',
    resizeMode: 'cover',
  },
  textWrapper: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    height: '100%'
  },
  title: {
    color: colors.blackColor,
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'flex-end'
  },
});


export default styles;