import {StyleSheet} from "react-native";
import {AppColors} from "../../theme/AppTheme";

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
        alignSelf: 'center',
        paddingTop: 19
    },

    text: {
        fontSize: 16,
    },

})

export default styles;


