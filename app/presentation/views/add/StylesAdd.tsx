import { StyleSheet, Dimensions } from "react-native";
import { AppColors } from "../../theme/AppTheme";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppColors.background,
        flex: 1,
        paddingHorizontal: width * 0.05,
        paddingTop: 20,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 20,
        marginTop: 20,
    },

    logo: {
        resizeMode: "contain",
    },

    title: {
        fontWeight: "bold",
        fontSize: width * 0.06,
        color: AppColors.text,
        flex: 1,
        textAlign: "center",
    },

    titleDivTetxt: {
        textAlign: "center",
        marginVertical: 15,
        fontWeight: "500",
        color: AppColors.text,
        fontSize: width * 0.05,
    },

    card: {
        height: "auto",
        width: '100%',
        backgroundColor: AppColors.backgroundPopUp,
        alignSelf: "center",
        borderRadius: 25,
        marginBottom: 25,
        paddingHorizontal: 20,
        paddingVertical: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },

    dropdown: {
        height: 50,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },

    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },

    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },

    icon: {
        marginRight: 5,
    },

    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    selectedStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        backgroundColor: 'white',
        shadowColor: '#000',
        marginTop: 8,
        marginRight: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },

    textSelectedStyle: {
        marginRight: 5,
        fontSize: 16,
    },

    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
    },

    containerImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 140,
        height: 140,
        borderRadius: 10,
    },

    imageContainer: {
        alignSelf: "center",
        height: "auto",
        width: '70%',
        alignItems: 'center',
        marginBottom: 60,
        backgroundColor: AppColors.amarillo,
        borderRadius: 20,
        padding: 10,
        justifyContent: 'center',
    },

    imageBox: {
        width: 140,
        height: 140,
        backgroundColor: '#FFF',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        marginBottom: 10,
    },

    descriptionContainer: {
        width: '80%',
        backgroundColor: '#FFF3CD',
        borderRadius: 15,
        padding: 15,
        marginBottom: 40,
    },
    descriptionInput: {
        height: 80,
        textAlignVertical: 'top',
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: AppColors.amarillo,
        paddingVertical: 12,
        paddingHorizontal: 45,
        borderRadius: 25,
        marginTop: 30,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        elevation: 2,
    },
    saveButtonText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        color: '#fff',
    },
});

export default styles;
