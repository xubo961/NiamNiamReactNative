import { StyleSheet } from "react-native";
import {AppColors} from "../../theme/AppTheme";
import {FavouritesScreen} from "./Favourites";


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
        marginBottom: 16,
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
    welcome: {
        fontSize: 16,
        color: "#333",
        textAlign: "center",
        paddingBottom:25,
    },
    searchContainer: {
        marginBottom: 16,
        paddingEnd:30,
        paddingStart:20,
        paddingBottom:25,
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
});


