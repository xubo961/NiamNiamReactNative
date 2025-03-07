import {StyleSheet} from "react-native";
import {AppColors, AppFonts} from "../../theme/AppTheme";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: AppColors.background,
    },

    imageContainer: {
        alignSelf: 'center',
        marginTop: 140
    },

    image: {
        width: 350,
        height: 350,
    },

    button: {
        marginTop: 40
    },

    textContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        paddingTop: 19,
        alignItems: 'center',
        justifyContent: 'center',
    },


    text: {
        fontSize: 16,
        fontFamily: AppFonts.light,
    },

})

export default styles;


