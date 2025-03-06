import { StyleSheet, Dimensions } from "react-native";
import { AppColors } from "../../theme/AppTheme";

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
        fontSize: width * 0.06, // Responsive font size based on screen width
    },
    welcome: {
        fontSize: 16,
        color: "#333",
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
        // You can adjust margins or paddings here if needed
    },

    favItemContainer: {
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    favItemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    favItemDescription: {
        fontSize: 14,
        color: '#555',
    },
    recipeImage: {
        width: width - 40, // Makes sure the image fits nicely
        height: 200, // Set height to be consistent for all images
        borderRadius: 8,
        marginVertical: 10,
        resizeMode: "cover", // Ensures images scale properly
    },
    deleteButton: {
        marginTop: 10,
        backgroundColor: '#FF6347',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        elevation: 2, // Adds a subtle shadow for a 3D effect
    },
    deleteButtonText: {
        color: '#fff',
        textAlign: 'center',
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
