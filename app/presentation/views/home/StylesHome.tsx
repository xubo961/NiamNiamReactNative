import { StyleSheet, Dimensions } from "react-native";
import { AppColors } from "../../theme/AppTheme";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppColors.background,
        flex: 1,
        paddingHorizontal: width * 0.05,
        paddingTop: 10,
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
    },

    welcomeText: {
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
        backgroundColor: AppColors.amarillo,
        borderRadius: 25,
        paddingHorizontal: width * 0.03,
        paddingVertical: height * 0.010,
        marginBottom: 30,
        shadowColor: AppColors.text,
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
