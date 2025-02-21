import {StatusBar, StyleSheet} from "react-native";
import {AppColors} from "../../theme/AppTheme";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF8E7",
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
    },

    header: {
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
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
    },

    welcomeText: {
        fontSize: 18,
        textAlign: "center",
        marginVertical: 15,
        fontWeight: "500",
    },

    tabContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 20,
        paddingBottom: 5,
    },

    tab: {
        fontSize: 16,
        color: "gray",
        paddingBottom: 5,
    },

    activeTab: {
        color: "red",
        fontWeight: "bold",
        textDecorationLine: "underline",
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

    searchIcon: {
        marginRight: 8,
    },

    searchInput: {
        flex: 1,
        fontSize: 14,
        color: "#000",
    },
});

export default styles;
