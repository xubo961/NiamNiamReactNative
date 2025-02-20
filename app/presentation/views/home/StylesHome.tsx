import { StyleSheet } from "react-native";
import {AppColors} from "../../theme/AppTheme";


export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF9E6", // Color de fondo similar al de la imagen
        paddingHorizontal: 16,
        paddingTop: 40,             // Margen superior
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom:10,
    },
    logo: {
        width: 50,
        height: 50,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
    },
    menuContainer: {
        // Opcionalmente, agrega márgenes si necesitas
    },
    welcome: {
        fontSize: 16,
        color: "#333",
        textAlign: "center",
    },
    tabContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    tabItem: {
        marginRight: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    tabText: {
        fontSize: 16,
        color: "#000",
    },
    searchContainer: {
        paddingTop: 16,
        marginBottom: 16,
        paddingEnd:30,
        paddingStart:20,
    },
    searchInput: {
        backgroundColor:AppColors.amarillo,
        textDecorationColor:AppColors.rojo,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 16,
        color: "#000",
        borderWidth: 1,
        borderColor: "#ddd",
    },
    dishesContainer: {
        marginBottom: 16,
        alignSelf: "center",
    },
    dishItem: {
        width: 120,
        alignItems: "center",
        marginRight: 16,

    },
    dishImage: {
        width: 80,
        height: 80,
        borderRadius: 40, // Para que se vea circular
        marginBottom: 8,
    },
    dishText: {
        fontSize: 14,
        textAlign: "center",
        color: "#333",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: "auto", // Empuja el footer hacia abajo
        marginBottom: 16,
    },
});
