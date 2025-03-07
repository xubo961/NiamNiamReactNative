import {StyleSheet} from "react-native";
import {AppColors, AppFonts} from "../../theme/AppTheme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: AppColors.background,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    card: {
        backgroundColor: AppColors.backgroundPopUp,
        paddingHorizontal: 30,
        paddingVertical: 40,
        borderRadius: 20,
        width: "85%",
        height: "60%",
        alignItems: "center",
        elevation: 5,
        marginTop: 50,
    },
    toggleContainer: {
        flexDirection: "row",
        marginBottom: 25,
        borderRadius: 30,
        backgroundColor: AppColors.grisClaro,
        overflow: "hidden",
        width: "80%",
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: "center",
        borderRadius: 30,
    },
    activeButton: {
        backgroundColor: AppColors.rojo,
    },
    toggleText: {
        fontSize: 16,
        color: AppColors.textWhite,
        fontFamily: AppFonts.light,

    },
    activeText: {
        color: AppColors.textWhite,
        fontWeight: "bold",
        fontFamily: AppFonts.light,
    },
    loginText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
        fontFamily: AppFonts.light,
    },
    forgotPassword: {
        marginTop: 15,
        color: "#777",
        fontSize: 14,
    },
    formInput: {
        width: '100%',
        gap: 20,
        marginTop: 5,
    }
});

export default styles;
