import { StyleSheet, Dimensions } from "react-native";
import { AppColors } from "../../theme/AppTheme";
import App from "../../../../App";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        backgroundColor: AppColors.background,
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 60,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 15,
    },

    logo: {
        resizeMode: "contain",
    },

    title: {
        fontWeight: "bold",
        color: AppColors.text,
        textAlign: "center",
        fontSize: width * 0.06,
    },

    welcome: {
        fontSize: 16,
        color: AppColors.text,
        textAlign: "center",
        paddingBottom: 25,
    },

    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FDD835",
        borderRadius: 25,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },

    searchInput: {
        flex: 1,
        fontSize: 14,
        color: "#000",
    },

    searchIcon: {
        marginRight: 8,
    },

    menuContainer: {
        alignItems: "center",
    },

    favItemContainer: {
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

    favItemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: AppColors.text,
        textAlign: "center"
    },

    favItemDescription: {
        fontSize: 14,
        color: '#555',
    },

    recipeImage: {
        width: width - 150,
        height: 200,
        borderRadius: 15,
        marginVertical: 10,
        resizeMode: "cover",
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

    noFavoritesText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginTop: 20,
    },

    errorText: {
        fontSize: 16,
        color: AppColors.rojo,
        textAlign: 'center',
        marginTop: 20,
    },
});
