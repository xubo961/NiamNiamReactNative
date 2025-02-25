import { StyleSheet } from "react-native";
import {AppColors} from "../../theme/AppTheme";
import {FavouritesScreen} from "./Favourites";


export default StyleSheet.create({
    container: {
        backgroundColor: "#FFF8E7",
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 15,
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: "contain",
    },
    title: {
        fontSize: 18,
        textAlign: "center",
        marginVertical: 15,
        fontWeight: "500",
        width:"70%",
    },
    welcome: {
        fontSize: 16,
        color: "#333",
        textAlign: "center",
        paddingBottom:25,
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
        // Ajusta si necesitas margen o padding adicional
    }


});


