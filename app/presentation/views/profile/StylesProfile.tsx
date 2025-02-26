import { StyleSheet, Dimensions } from "react-native";
import {AppColors} from "../../theme/AppTheme";

const { width } = Dimensions.get("window");

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
        // Las dimensiones dinámicas se establecen en el componente
        resizeMode: "contain",
    },
    title: {
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
    },
    menuContainer: {
        paddingStart: 20,
    },
    usernameContainer: {
        backgroundColor: AppColors.backgroundPopUp,
        borderRadius: 25,
        padding: 16,
        marginBottom: 8,
        marginLeft: 90,
        width: "50%",
        alignItems: "center",
    },
    usernameText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
    },
    descriptionContainer: {
        backgroundColor: AppColors.backgroundPopUp,
        borderRadius: 25,
        padding: 16,
        marginBottom: 16,
        width: "90%",
        marginLeft: 20,
        marginTop: 8,
    },
    descriptionText: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#000",
        textAlign: "center",
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
        marginTop: 8,
        color: "#000",
        backgroundColor: AppColors.backgroundPopUp,
        width: "50%",
        marginStart: 90,
        textAlign: "center",
        borderRadius: 35,

    },
    recipesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingBottom: 16,
    },
    recipeItem: {
        width: "48%",
        alignItems: "center",
        marginBottom: 16,
    },
    recipeImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 8,
    },
    recipeTitle: {
        fontSize: 14,
        color: "#000",
        textAlign: "center",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: "auto",
        marginBottom: 16,
    },
});
