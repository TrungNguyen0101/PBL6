import { StyleSheet } from "react-native"
import colors from "../../contains/colors";

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 16,
        borderRadius: 4,
        backgroundColor: colors.primaryColor,
        shadowColor: colors.blackColor,
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        marginBottom: 16,
    },
    title: {
        color: colors.whiteColor,
        textTransform: 'uppercase',
        marginBottom: 8,
        fontWeight: '700'
    }
})

export default styles;