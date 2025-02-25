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
        // Se sobreescribe el ancho y alto de forma dinámica en el componente
        resizeMode: "contain",
    },
    title: {
        // Se sobreescribe el tamaño de fuente de forma dinámica en el componente
        fontWeight: "bold",
        color: AppColors.text,
        textAlign: "center",
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
        // Puedes ajustar márgenes o paddings adicionales si lo requieres
    },
});
