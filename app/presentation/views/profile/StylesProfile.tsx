import {StyleSheet, Dimensions} from "react-native";
import {AppColors, AppFonts} from "../../theme/AppTheme";

const {width} = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.background,
        paddingHorizontal: 16,
        paddingTop: 60,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
    },

    logo: {
        resizeMode: "contain",
    },
    title: {
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
    },

    textFoodRecipesContainer: {
        alignSelf: "center",
        backgroundColor: AppColors.amarilloConatiner,
        borderRadius: 25,
        padding: 16,
        marginBottom: 8,
        width: "50%",
        alignItems: "center",
        fontFamily: AppFonts.light
    },

    yourRecipesText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
    },

    yourRecipesItemContainer: {
        alignSelf: "center",
        width: width * 0.8,
        backgroundColor: AppColors.backgroundPopUp,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        marginBottom: 25,
    },

    menuContainer: {
      alignItems: "center",
    },

    yourRecipesItemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: AppColors.text,
        textAlign: "center"
    },

    recipeImage: {
        width: width - 150,
        height: 200,
        borderRadius: 15,
        marginVertical: 10,
        resizeMode: "cover",
    },



});
