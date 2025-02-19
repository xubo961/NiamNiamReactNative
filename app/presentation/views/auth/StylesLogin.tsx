import { StyleSheet } from "react-native";
import { AppColors } from "../../theme/AppTheme"; // Ajusta si tienes tu propio tema

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: AppColors.background
    },

    imageContainer: {
        alignSelf: 'center',
        marginTop: 130,
    },

    image: {
        width: 125,
        height: 125,
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

    formContainer: {
        width: '90%',
        backgroundColor: AppColors.backgroundPopUp,
        paddingVertical: 120,
        paddingHorizontal: 15,
        marginHorizontal: "auto",
        marginTop: 80,
        borderRadius: 25,
    },
    formTittle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
        borderBottomWidth: 1,
        paddingBottom: 9,
        color: AppColors.amarillo,
        borderBottomColor: AppColors.amarillo,
    },

});

export default styles;
