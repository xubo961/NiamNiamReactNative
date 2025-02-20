import {StatusBar, StyleSheet} from "react-native";
import {AppColors} from "../../theme/AppTheme";

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppColors.background,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: StatusBar.currentHeight,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        padding: 20,
    },
    logo: {
        width: 100,
        height: 100,
    }
});

export default styles