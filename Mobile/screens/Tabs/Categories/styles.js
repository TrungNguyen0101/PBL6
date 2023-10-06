import { StyleSheet } from "react-native";
import colors from "../../../contains/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColor,
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8
    },
});

export default styles;