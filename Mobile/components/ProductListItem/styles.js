import { StyleSheet } from 'react-native'
import colors from '../../contains/colors';

const styles = StyleSheet.create({
    shadow: {
        shadowColor: colors.blackColor,
        shadowOpacity: 0.1,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 0 },
        flex: 1
    },
    container: {
        marginBottom: 20,
        borderRadius: 4,
        backgroundColor: colors.whiteColor,
        overflow: 'hidden'
    },
    img: {
        height: 150,
    },
    info: {
        padding: 8
    },
    name: {
        fontSize: 16,
        marginBottom: 8
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    price: {
        fontSize: 16,
        color: '#888',
        flex: 1
    },
    cartBtn: {
        paddingHorizontal: 24,
        paddingVertical: 4,
        backgroundColor: colors.primaryColor,
        borderRadius: 6
    },
    cartText: {
        textTransform: 'uppercase',
        fontSize: 16,
        color: colors.whiteColor
    }
})

export default styles;