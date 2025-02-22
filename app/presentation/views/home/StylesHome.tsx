import { StyleSheet, Dimensions } from "react-native";
import { AppColors } from "../../theme/AppTheme";

const { width, height } = Dimensions.get("window");

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

    horizontalCardWrapper: {
        paddingVertical: 10,
    },


    card: {
        width: width * 0.6,
        marginRight: width * 0.08,
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
    },

    cardImage: {
        width: "100%",
        height: width * 0.5,
        resizeMode: "cover",
        borderRadius: width * 0.25,
        marginBottom: 10,
        alignSelf: "center",
    },

    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        color: AppColors.text,
        marginTop: 5,
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },

    modalContainer: {
        backgroundColor: AppColors.backgroundPopUp,
        width: "90%",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        elevation: 5,
        maxHeight: "80%",
    },

    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: AppColors.text,
        marginBottom: 10,
    },

    descriptionContainer: {
        backgroundColor: AppColors.backgroundPopUpConatiner,
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        width: "100%",
    },

    descriptionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: AppColors.text,
    },

    descriptionText: {
        fontSize: 14,
        color: AppColors.text,
        lineHeight: 20,
        textAlign: "justify",
    },

    boldText: {
        fontWeight: "bold",
        color: AppColors.text,
    },

    modalRecipeImage: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        resizeMode: "cover",
        marginBottom: 15,
    },

    modalCloseButton: {
        backgroundColor: AppColors.rojo,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginTop: 10,
    },

    modalCloseText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },



});

export default styles;
