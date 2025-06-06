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
        marginBottom: 20
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
        marginBottom: 40,
    },

    misRecetasItemContainer: {
        alignSelf: "center",
        width: width * 0.8,
        backgroundColor: AppColors.backgroundPopUp,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
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

    noRecipesText: {
        textAlign: "center",
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 20,
    },

    deleteButton: {
        marginTop: 10,
        backgroundColor: AppColors.rojo,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        elevation: 2,
    },

    deleteButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold'
    },

    errorText: {
        fontSize: 16,
        color: AppColors.rojo,
        textAlign: 'center',
        marginTop: 20,
    },

    noMisRecetasText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginTop: 20,
    },

    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    modalContent: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    title1: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center"
    },
    label: {
        fontSize: 16,
        marginBottom: 5
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 10,
        marginBottom: 15
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    saveButton: {
        backgroundColor: "#4caf50",
        padding: 10,
        borderRadius: 8,
        flex: 1,
        marginRight: 5,
        alignItems: "center"
    },
    saveButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },
    cancelButton: {
        backgroundColor: "#f44336",
        padding: 10,
        borderRadius: 8,
        flex: 1,
        marginLeft: 5,
        alignItems: "center"
    },
    cancelButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },

    profileCard: {
        marginVertical: 20,
        padding: 10,
        borderRadius: 20,
        backgroundColor: "#fdf5cc",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignItems: "center",
        width: "90%",
        alignSelf: "center",
        position: "relative"
    },
    usernameBadge: {
        position: "absolute",
        top: -10,
        backgroundColor: "#f7df56",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 15,
        zIndex: 1
    },
    usernameText: {
        fontWeight: "bold",
        fontSize: 25,
        color: "#333"
    },
    descriptionBox: {
        marginTop: 20,
        backgroundColor: "#fff6d6",
        borderRadius: 16,
        padding: 16,
        width: "100%"
    },
    descriptionText: {
        color: "#333",
        fontSize: 20,
        textAlign : "center",
        fontWeight: "bold",
    }



});
