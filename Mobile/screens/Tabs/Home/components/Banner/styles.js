import { StyleSheet } from "react-native";
import colors from '../../../../../contains/colors'

const styles = StyleSheet.create({
    dotWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        top: -50
    },
    dotActive: {
        backgroundColor: colors.primaryColor,
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 4
    },
    dotNonActive: {
        backgroundColor: colors.grayColor,
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 4
    }
})

export default styles;
