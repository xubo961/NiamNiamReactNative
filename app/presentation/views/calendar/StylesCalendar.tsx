import { StyleSheet, Dimensions } from 'react-native';

import { AppColors } from '../../theme/AppTheme';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#FEFBF0',
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        marginBottom: 12,
    },
    logoText: {
        fontSize: 24,
    },
    screenTitle: {
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
    },
    menu: {
        fontSize: 24,
        paddingHorizontal: 4,
        paddingVertical: 2,
    },
    cardContainer: {
        backgroundColor: '#F8F2DE',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    labelHeading: {
        fontSize: 16,
        marginBottom: 8,
        color: '#000',
    },

    dropdown: {
        height: 55,
        backgroundColor: '#F8DD6F',
        borderRadius: 12,
        marginBottom: 16,
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    mealRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        paddingTop: 40,
        fontSize: 15,
    },
    mealLabel: {
        backgroundColor: '#FFD966',
        borderRadius: 16,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginRight: 16,
        height: 40,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },

    labelText: {
        fontWeight: 'bold',
        color: '#000',
    },

    mealBox: {
        flex: 1,
        height: 60,
        backgroundColor: 'bgCyan',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        marginLeft: 16,
        borderWidth: 1,
        borderColor: '#000',
    },

    plus: {
        fontSize: 24,
        color: '#333',
    },

    logo: {
        resizeMode: 'contain',
    },

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },

    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    title1: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },

    label: {
        fontSize: 16,
        marginBottom: 5,
        backgroundColor: 'bgCyan',
    },

    input: {
        borderWidth: 1,
        borderColor: 'bgCyan',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    saveButton: {
        backgroundColor: '#4caf50',
        padding: 5,
        borderRadius: 8,
        flex: 1,
        marginRight: 5,
        alignItems: 'center',
    },

    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },

    cancelButton: {
        backgroundColor: '#f44336',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        marginLeft: 5,
        alignItems: 'center',
    },

    cancelButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },

    title: {
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },

    mealSavedBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFF081',
        borderRadius: 8,
        padding: 8,
        backgroundColor: '#FFEBA9',
    },
    savedImage: { width: 70, height: 70, borderRadius: 4, marginRight: 8 },
    savedText: { fontSize: 15, fontWeight: 'bold', color: '#000' },

    detailCard: {
        width: width * 0.9,
        backgroundColor: AppColors.backgroundPopUp,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        overflow: 'hidden',
        alignItems: 'center',
        padding: 10,
    },
    detailContent: {
        backgroundColor: AppColors.backgroundPopUpConatiner,
        borderRadius: 15,
        padding: 15,
        marginVertical: 10,
        width: '100%',
    },
    detailLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: AppColors.text,
    },
    detailText: {
        fontSize: 14,
        color: AppColors.text,
        lineHeight: 20,
        textAlign: 'justify',
        marginBottom: 8,
    },
    detailImage: {
        width: width * 0.8,
        height: width * 0.5,
        borderRadius: 10,
        resizeMode: 'cover',
        marginVertical: 12,
    },
    detailButtonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    cleanButton: {
        backgroundColor: AppColors.cleanButton,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
    },
    cleanButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: AppColors.rojo,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
    },
    closeButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    saveModeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    saveModeLabel: {
        fontSize: 16,
        color: '#000',
        marginHorizontal: 8,
    },

    modalCloseButton: {
        backgroundColor: '#f44336',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginRight: 8,
    },
    modalCloseButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    modalCleanButton: {
        backgroundColor: '#4dd0e1',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginRight: 8,
    },
    modalCleanButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    modalSaveButton: {
        backgroundColor: '#4caf50',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    modalSaveButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    },




});
